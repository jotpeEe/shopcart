import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import messages from '../../../../messages/en.json';
import WithForm from '../../../../tests/components/WithForm';
import { default as Form } from '../forms/LoginForm';
import { type LoginSchemaType } from '../forms/schemas';
import { type LoginType } from '../services/login';

const mockLoginInvalidPassword = jest.fn((values: LoginSchemaType) =>
    Promise.resolve({
        error: 'Invalid password',
        status: 401,
        ok: false,
        url: null,
    })
);

const mockLoginCatchError = jest.fn((values: LoginSchemaType) =>
    Promise.resolve({
        error: 'fdsgdsfgdsfgdsfgfdgdsfgds',
        status: 401,
        ok: false,
        url: null,
    })
);

const mockLoginNoEmail = jest.fn((values: LoginSchemaType) =>
    Promise.resolve({
        error: 'There is no account with that email adress',
        status: 401,
        ok: false,
        url: null,
    })
);

const mockLogin = jest.fn((values: LoginSchemaType) =>
    Promise.resolve({
        error: 'error',
        status: 200,
        ok: true,
        url: null,
    })
);

const LoginForm = ({ login }: { login: LoginType }) => (
    <WithForm defaultValues={{ email: '', password: '' }}>
        <Form login={login} />
    </WithForm>
);

const passwordPlaceholder = messages.auth.login.placeholders[1] as string;

describe('LoginForm', () => {
    it('should allow user to type in email input', () => {
        render(<LoginForm login={mockLogin} />);
        const emailInput = screen.getByRole('textbox') as HTMLInputElement;

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

        expect(emailInput.value).toBe('test@example.com');
    });

    it('should allow user to type in password input', () => {
        render(<LoginForm login={mockLogin} />);
        const passwordInput = screen.getByPlaceholderText(
            passwordPlaceholder
        ) as HTMLInputElement;

        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(passwordInput.value).toBe('password123');
    });

    it('should change password visibility after clicking toggle button for password input field', async () => {
        render(<LoginForm login={mockLogin} />);

        const toggleButton = screen.getByTestId('password-toggle-button');
        const inputElement = screen.getByPlaceholderText(passwordPlaceholder);

        expect(toggleButton).toBeInTheDocument();

        fireEvent.click(toggleButton);

        expect(inputElement).toHaveAttribute('type', 'text');
    });

    it('displays two input fields with one having a hidden value', async () => {
        render(<LoginForm login={mockLogin} />);

        const emailInput = screen.getByRole('textbox');
        const passwordInput = screen.getByPlaceholderText(passwordPlaceholder);

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();

        expect(passwordInput).toHaveAttribute('type', 'password');
    });

    describe('Validation', () => {
        it('should display required error when values are invalid', async () => {
            render(<LoginForm login={mockLogin} />);

            fireEvent.submit(screen.getByTestId('Login-submit'));

            expect(await screen.findAllByRole('alert')).toHaveLength(2);
            expect(mockLogin).not.toHaveBeenCalled();
        });

        it('should display matching error when email is invalid', async () => {
            render(<LoginForm login={mockLogin} />);

            const emailInput = screen.getByRole('textbox');
            const passwordInput = screen.getByPlaceholderText(passwordPlaceholder);
            const submitButton = screen.getByTestId('Login-submit');

            fireEvent.input(emailInput, {
                target: {
                    value: 'test',
                },
            });

            fireEvent.input(passwordInput, {
                target: {
                    value: 'password',
                },
            });

            fireEvent.submit(submitButton);

            expect(await screen.findAllByRole('alert')).toHaveLength(1);
            expect(mockLogin).not.toHaveBeenCalled();
            expect(emailInput).toHaveValue('test');
            expect(passwordInput).toHaveValue('password');
        });
    });

    describe('Error messages', () => {
        it('should handle server password error and assign to correct form message element', async () => {
            render(<LoginForm login={mockLoginInvalidPassword} />);

            const emailInput = screen.getByRole('textbox');
            const passwordInput = screen.getByPlaceholderText(passwordPlaceholder);
            const submitButton = screen.getByTestId('Login-submit');

            fireEvent.input(emailInput, {
                target: {
                    value: 'test@mail.com',
                },
            });

            fireEvent.input(passwordInput, {
                target: {
                    value: 'password',
                },
            });

            fireEvent.click(submitButton);

            await waitFor(() => {
                expect(mockLoginInvalidPassword).toHaveBeenCalledWith({
                    email: 'test@mail.com',
                    password: 'password',
                });
            });

            const alertElement = await screen.findByRole('alert');
            const alertId = alertElement.getAttribute('id');
            const passwordInputId = passwordInput.getAttribute('id');

            expect(alertId).toContain(passwordInputId);
            expect(alertElement).toHaveTextContent(/Invalid password/i);
            expect(emailInput).toHaveValue('test@mail.com');
            expect(passwordInput).toHaveValue('password');
        });

        it('should handle server email error and assign to correct form message element', async () => {
            render(<LoginForm login={mockLoginNoEmail} />);

            const emailInput = screen.getByRole('textbox');
            const passwordInput = screen.getByPlaceholderText(passwordPlaceholder);
            const submitButton = screen.getByTestId('Login-submit');

            fireEvent.input(emailInput, {
                target: {
                    value: 'test@mail.com',
                },
            });

            fireEvent.input(passwordInput, {
                target: {
                    value: 'pass',
                },
            });

            fireEvent.click(submitButton);

            await waitFor(() => {
                expect(mockLoginNoEmail).toHaveBeenCalledWith({
                    email: 'test@mail.com',
                    password: 'pass',
                });
            });

            const alertElement = await screen.findByRole('alert');
            const alertId = alertElement.getAttribute('id');
            const emailId = emailInput.getAttribute('id');

            expect(alertId).toContain(emailId);
            expect(await screen.findByRole('alert')).toHaveTextContent(
                /There is no account with that address/i
            );
            expect(emailInput).toHaveValue('test@mail.com');
            expect(passwordInput).toHaveValue('pass');
        });

        it('should handle unknown server error and show toast with user-friendly text', async () => {
            render(<LoginForm login={mockLoginCatchError} />);

            const emailInput = screen.getByRole('textbox');
            const passwordInput = screen.getByPlaceholderText(passwordPlaceholder);
            const submitButton = screen.getByTestId('Login-submit');

            fireEvent.input(emailInput, {
                target: {
                    value: 'test@mail.com',
                },
            });

            fireEvent.input(passwordInput, {
                target: {
                    value: 'pass',
                },
            });

            fireEvent.click(submitButton);

            await waitFor(() => {
                expect(mockLoginCatchError).toHaveBeenCalled();
            });

            const toastElement = await screen.findByTestId('toast');

            expect(toastElement).toBeInTheDocument();
            expect(emailInput).toHaveValue('test@mail.com');
            expect(passwordInput).toHaveValue('pass');
        });
    });
});
