import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { default as Form } from '@/features/auth/forms/RegisterForm';
import { type RegisterType } from '@/features/auth/services/register';

import messages from '../../../../messages/en.json';
import WithForm from '../../../../tests/unit/WithForm';

const RegisterForm = ({ register }: { register: RegisterType }) => (
    <WithForm defaultValues={{ email: '', password: '', passwordConfirm: '' }}>
        <Form register={register} />
    </WithForm>
);

const t = messages.auth.messages;
const { placeholders, button } = messages.auth.register;

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

const successfulRegisterMock = jest
    .fn()
    .mockResolvedValue({ success: t.server.signedIn });

const setup = (register?: any) => {
    const handleSubmit = register || jest.fn();
    render(<RegisterForm register={handleSubmit} />);
    const user = {
        email: 'test@test.com',
        password: 'password123',
        passwordConfirm: 'password123',
    };
    const changeEmailInput = (value: string) =>
        fireEvent.change(screen.getByPlaceholderText(placeholders[0] as string), {
            target: { value },
        });
    const changePasswordInput = (value: string) =>
        fireEvent.change(screen.getByPlaceholderText(placeholders[1] as string), {
            target: { value },
        });
    const changeConfirmPassInput = (value: string) =>
        fireEvent.change(screen.getByPlaceholderText(placeholders[2] as string), {
            target: { value },
        });
    const clickSubmit = () => fireEvent.click(screen.getByText(button));

    return {
        handleSubmit,
        user,
        changeEmailInput,
        changePasswordInput,
        changeConfirmPassInput,
        clickSubmit,
    };
};

const setupSuccessCase = () => {
    const utils = setup(successfulRegisterMock);
    utils.changeEmailInput(utils.user.email);
    utils.changePasswordInput(utils.user.password);
    utils.changeConfirmPassInput(utils.user.passwordConfirm);
    utils.clickSubmit();
    return utils;
};

const setupWithTooShortPassword = () => {
    const utils = setup();
    utils.changeEmailInput(utils.user.email);
    utils.changePasswordInput('pass');
    utils.changeConfirmPassInput('pass');
    utils.clickSubmit();

    return utils;
};

const setupWithInvalidEmail = () => {
    const utils = setup();
    utils.changeEmailInput('diffEmail');
    utils.changePasswordInput(utils.user.password);
    utils.changeConfirmPassInput(utils.user.password);
    utils.clickSubmit();

    return utils;
};

const setupWithNoMatchPasswords = () => {
    const utils = setup();
    utils.changePasswordInput(utils.user.password);
    utils.changeConfirmPassInput('different_password');
    utils.clickSubmit();

    return utils;
};

it('does not submit the form when fields are empty', async () => {
    const { clickSubmit, handleSubmit } = setup();

    clickSubmit();

    await waitFor(() => expect(handleSubmit).not.toHaveBeenCalled());
});

it('submits the form with valid input', async () => {
    const { handleSubmit, user } = setupSuccessCase();

    await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledWith(user);
    });
    expect(screen.getByText(t.server.signedIn)).toBeInTheDocument();
});

it('displays error for invalid email format', async () => {
    const { handleSubmit } = setupWithInvalidEmail();

    expect(await screen.findByRole('alert')).toHaveTextContent(t.email.invalid);
    expect(handleSubmit).not.toHaveBeenCalled();
});

it('displays error when password is too short', async () => {
    const { handleSubmit } = setupWithTooShortPassword();

    expect(await screen.findByRole('alert')).toHaveTextContent(t.password.min);
    expect(handleSubmit).not.toHaveBeenCalled();
});

it('displays error message for password confirmation mismatch', async () => {
    setupWithNoMatchPasswords();

    expect(await screen.findByText(t.password.noMatch)).toBeInTheDocument();
    expect(await screen.findByText(t.email.empty)).toBeInTheDocument();
});
