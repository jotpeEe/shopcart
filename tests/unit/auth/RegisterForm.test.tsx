import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import RegisterForm from '@/features/auth/forms/RegisterForm';
import { type RegisterSchemaType } from '@/features/auth/forms/schemas';

import messages from '../../../messages/en.json';
import WithForm from '../WithForm';

const t = messages.auth.messages;
const { placeholders, button } = messages.auth.register;

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

const setup = (variants?: 'success' | 'emailExist') => {
    const handleSubmit = jest.fn(
        (values: RegisterSchemaType) =>
            ({
                success: {
                    ok: true,
                    error: null,
                    status: 200,
                    url: null,
                },
                emailExist: {
                    ok: false,
                    error: 'messages.email.alreadyExist',
                    status: 400,
                    url: null,
                },
            })[variants || 'success']
    );

    render(
        <WithForm defaultValues={{ email: '', password: '', passwordConfirm: '' }}>
            <RegisterForm register={handleSubmit} />
        </WithForm>
    );

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
        changeEmailInput,
        changeConfirmPassInput,
        changePasswordInput,
        clickSubmit,
        handleSubmit,
        user,
    };
};

it('does not submit the form when fields are empty', async () => {
    const { handleSubmit, clickSubmit } = setup();

    clickSubmit();

    await waitFor(() => expect(handleSubmit).not.toHaveBeenCalled());
});

it('submits the form with valid input', async () => {
    const {
        handleSubmit,
        changeEmailInput,
        changePasswordInput,
        changeConfirmPassInput,
        clickSubmit,
        user,
    } = setup('success');

    changeEmailInput(user.email);
    changePasswordInput(user.password);
    changeConfirmPassInput(user.passwordConfirm);
    clickSubmit();

    await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledWith(user);
    });

    const toastElement = await screen.findByTestId('toast');
    expect(toastElement).toBeInTheDocument();
});

it('displays error for invalid email format', async () => {
    const {
        handleSubmit,
        changeConfirmPassInput,
        changeEmailInput,
        changePasswordInput,
        clickSubmit,
        user,
    } = setup();

    changeEmailInput('diffEmail');
    changePasswordInput(user.password);
    changeConfirmPassInput(user.passwordConfirm);
    clickSubmit();

    expect(await screen.findByRole('alert')).toHaveTextContent(t.email.invalid);
    expect(handleSubmit).not.toHaveBeenCalled();
});

it('displays error when password is too short', async () => {
    const {
        changeConfirmPassInput,
        changeEmailInput,
        changePasswordInput,
        clickSubmit,
        handleSubmit,
        user,
    } = setup();

    changeEmailInput(user.email);
    changePasswordInput('pass');
    changeConfirmPassInput('pass');
    clickSubmit();
    expect(await screen.findByRole('alert')).toHaveTextContent(t.password.min);

    expect(handleSubmit).not.toHaveBeenCalled();
});

it('displays error message for password confirmation mismatch', async () => {
    const { changePasswordInput, changeConfirmPassInput, clickSubmit, user } = setup();

    changePasswordInput(user.password);
    changeConfirmPassInput('different_password');
    clickSubmit();

    expect(await screen.findByText(t.password.noMatch)).toBeInTheDocument();
    expect(await screen.findByText(t.email.empty)).toBeInTheDocument();
});

it('displays error message when email already used', async () => {
    const {
        changePasswordInput,
        changeConfirmPassInput,
        clickSubmit,
        changeEmailInput,
        user,
    } = setup('emailExist');

    changeEmailInput('test@test.com');
    changePasswordInput(user.password);
    changeConfirmPassInput(user.password);
    clickSubmit();

    expect(await screen.findByText(t.email.alreadyExist)).toBeInTheDocument();
});
