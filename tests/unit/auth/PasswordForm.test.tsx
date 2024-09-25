import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import PasswordForm from '@/features/auth/forms/PasswordForm';
import { type LoginSchemaType } from '@/features/auth/forms/schemas';

import messages from '../../../messages/en.json';
import WithForm from '../WithForm';

const t = messages.auth.messages;
const { placeholders } = messages.auth.login;

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

const extractId = (input: string | null) => {
    const regex = /:(.*?):/;
    const match = input?.match(regex);

    if (match && match.length > 1) {
        return match[1];
    } else {
        return null;
    }
};

type LoginVariant = 'default' | 'catchError' | 'invalidPassword';

const setup = (loginVariant: LoginVariant = 'default') => {
    const handleSubmit = jest.fn((values: LoginSchemaType) =>
        Promise.resolve(
            {
                default: {
                    error: 'error',
                    status: 200,
                    ok: true,
                    url: null,
                },
                catchError: {
                    error: 'fdsgdsfgdsfgdsfgfdgdsfgds',
                    status: 401,
                    ok: false,
                    url: null,
                },
                invalidPassword: {
                    error: 'messages.password.invalid',
                    status: 401,
                    ok: false,
                    url: null,
                },
            }[loginVariant]
        )
    );

    const user = {
        email: 'test@test.com',
        password: 'password123',
    };

    render(
        <WithForm defaultValues={{ email: '', password: '' }}>
            <PasswordForm action={handleSubmit} email={user.email} />
        </WithForm>
    );

    const submitButton = screen.getByTestId('submit-button');

    const passwordInput = screen.getByPlaceholderText(
        placeholders[1] as string
    ) as HTMLInputElement;

    const changePasswordInput = (value: string) =>
        fireEvent.change(passwordInput, { target: { value } });

    const clickSubmit = () => fireEvent.click(submitButton);

    return {
        changePasswordInput,
        submitButton,
        passwordInput,
        clickSubmit,
        handleSubmit,
        user,
    };
};

describe('PasswordForm', () => {
    it('should allow user to type in password input', () => {
        const { passwordInput, changePasswordInput, user } = setup();

        changePasswordInput(user.password);

        expect(passwordInput).toBeInTheDocument();
        expect(passwordInput).toHaveAttribute('type', 'password');
        expect(passwordInput.value).toBe(user.password);
    });

    it('should change password visibility after clicking toggle button for password input field', () => {
        const { passwordInput } = setup();
        const toggleButton = screen.getByTestId('password-toggle-button');

        fireEvent.click(toggleButton);

        expect(toggleButton).toBeInTheDocument();
        expect(passwordInput).toHaveAttribute('type', 'text');
    });

    describe('Validation', () => {
        it('should not be able to submit without any prompt', async () => {
            const { clickSubmit, handleSubmit, submitButton } = setup();

            clickSubmit();

            expect(handleSubmit).not.toHaveBeenCalled();
            expect(submitButton).toHaveAttribute('disabled');
        });

        it('should display matching error when password is invalid', async () => {
            const {
                passwordInput,
                changePasswordInput,
                clickSubmit,
                handleSubmit,
                user,
            } = setup('invalidPassword');

            changePasswordInput(user.password);

            clickSubmit();

            await waitFor(() => {
                expect(handleSubmit).toHaveBeenCalledWith(user);
            });

            const alertElement = await screen.findByRole('alert');
            expect(alertElement).toBeInTheDocument();
            expect(alertElement).toHaveTextContent(t.password.invalid);
            expect(passwordInput).toHaveValue(user.password);
        });

        it('should handle unknown server error and show toast with user-friendly text', async () => {
            const {
                passwordInput,
                changePasswordInput,
                clickSubmit,
                user,
                handleSubmit,
            } = setup('catchError');

            changePasswordInput(user.password);

            clickSubmit();

            await waitFor(() => {
                expect(handleSubmit).toHaveBeenCalledWith(user);
            });

            const toastElement = await screen.findByTestId('toast');

            expect(toastElement).toBeInTheDocument();
            expect(passwordInput).toHaveValue(user.password);
        });
    });
});
