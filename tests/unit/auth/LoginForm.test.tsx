import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import LoginForm from '@/features/auth/forms/LoginForm';
import { type EmailSchemaType } from '@/features/auth/forms/schemas';

import messages from '../../../messages/en.json';
import WithForm from '../WithForm';

const t = messages.auth.messages;
const { placeholders } = messages.auth.login;

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

const setup = (emailVariant: 'noEmail' | 'success' = 'success') => {
    const mockValidateEmail = jest.fn(
        (values: EmailSchemaType) =>
            ({
                success: {
                    ok: true,
                    error: null,
                    status: 200,
                    url: null,
                },
                noEmail: {
                    ok: false,
                    error: t.email.notExist,
                    status: 400,
                    url: null,
                },
            })[emailVariant]
    );

    render(
        <WithForm defaultValues={{ email: '', password: '' }}>
            <LoginForm validateEmail={mockValidateEmail} />
        </WithForm>
    );

    const email = 'test@test.com';

    const emailInput = screen.getByPlaceholderText(
        placeholders[0] as string
    ) as HTMLInputElement;
    const submitButton = screen.getByTestId('submit-button');

    const changeEmailInput = (value: string) =>
        fireEvent.change(emailInput, { target: { value } });

    const clickSubmit = () => fireEvent.submit(submitButton);

    return {
        changeEmailInput,
        submitButton,
        emailInput,
        clickSubmit,
        email,
    };
};

describe('LoginForm', () => {
    it('should allow user to type in email input', () => {
        const { emailInput, changeEmailInput, email } = setup();

        changeEmailInput(email);

        expect(emailInput.value).toBe(email);
    });

    it('submit button is disabled when password field is empty', () => {
        const { emailInput, submitButton, changeEmailInput } = setup();

        changeEmailInput('');

        expect(emailInput.value).toBe('');
        expect(submitButton).toBeDisabled();

        changeEmailInput('s');

        expect(submitButton).toBeEnabled();
    });

    it('submit button should disappear after submit successful', async () => {
        const { clickSubmit, email, submitButton, changeEmailInput } = setup();

        changeEmailInput(email);

        clickSubmit();

        await waitFor(() => {
            const button = screen.queryAllByTestId('submit-button');

            expect(submitButton.id === button[0]?.id).toBe(false);
        });
    });

    // describe('Validation', () => {
    //     it('should display required error when values are invalid', async () => {
    //         const { clickSubmit, handleSubmit } = setup();

    //         clickSubmit();

    //         expect(await screen.findAllByRole('alert')).toHaveLength(2);
    //         expect(handleSubmit).not.toHaveBeenCalled();
    //     });

    //     it('should display matching error when email is invalid', async () => {
    //         const {
    //             emailInput,
    //             passwordInput,
    //             changeEmailInput,
    //             changePasswordInput,
    //             clickSubmit,
    //             handleSubmit,
    //             user,
    //         } = setup();

    //         changeEmailInput('test');
    //         changePasswordInput(user.password);

    //         clickSubmit();

    //         expect(await screen.findAllByRole('alert')).toHaveLength(1);
    //         expect(handleSubmit).not.toHaveBeenCalled();
    //         expect(emailInput).toHaveValue('test');
    //         expect(passwordInput).toHaveValue(user.password);
    //     });
    // });

    // describe('Error messages', () => {
    //     it('should handle server password error and assign to correct form message element', async () => {
    //         const {
    //             emailInput,
    //             passwordInput,
    //             changeEmailInput,
    //             changePasswordInput,
    //             clickSubmit,
    //             handleSubmit,
    //             user,
    //         } = setup('invalidPassword');

    //         const { email, password } = user;

    //         changeEmailInput(email);
    //         changePasswordInput(password);

    //         clickSubmit();

    //         await waitFor(() => {
    //             expect(handleSubmit).toHaveBeenCalledWith({
    //                 email,
    //                 password,
    //             });
    //         });

    //         const alertElement = await screen.findByRole('alert');
    //         const alertId = alertElement.getAttribute('id');
    //         const passwordInputId = passwordInput.getAttribute('id');

    //         expect(alertId).toContain(passwordInputId);
    //         expect(alertElement).toHaveTextContent(t.password.invalid);
    //         expect(emailInput).toHaveValue(email);
    //         expect(passwordInput).toHaveValue(password);
    //     });

    //     it('should handle server email error and assign to correct form message element', async () => {
    //         const {
    //             emailInput,
    //             passwordInput,
    //             changeEmailInput,
    //             changePasswordInput,
    //             clickSubmit,
    //             handleSubmit,
    //             user,
    //         } = setup('noEmail');
    //         const { email } = user;

    //         changeEmailInput(email);
    //         changePasswordInput('pass');

    //         clickSubmit();

    //         await waitFor(() => {
    //             expect(handleSubmit).toHaveBeenCalledWith({
    //                 email,
    //                 password: 'pass',
    //             });
    //         });

    //         const alertElement = await screen.findByRole('alert');
    //         const alertId = alertElement.getAttribute('id');
    //         const emailId = emailInput.getAttribute('id');

    //         expect(alertId).toContain(emailId);
    //         expect(await screen.findByRole('alert')).toHaveTextContent(t.email.notExist);
    //         expect(emailInput).toHaveValue(email);
    //         expect(passwordInput).toHaveValue('pass');
    //     });

    //     it('should handle unknown server error and show toast with user-friendly text', async () => {
    //         const {
    //             emailInput,
    //             passwordInput,
    //             changeEmailInput,
    //             changePasswordInput,
    //             clickSubmit,
    //             user,
    //             handleSubmit,
    //         } = setup('catchError');

    //         const { email, password } = user;

    //         changeEmailInput(email);
    //         changePasswordInput(password);

    //         clickSubmit();

    //         await waitFor(() => {
    //             expect(handleSubmit).toHaveBeenCalled();
    //         });

    //         const toastElement = await screen.findByTestId('toast');

    //         expect(toastElement).toBeInTheDocument();
    //         expect(emailInput).toHaveValue(email);
    //         expect(passwordInput).toHaveValue(password);
    //     });
    // });
});
