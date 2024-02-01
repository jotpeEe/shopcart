import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { FormTextInput } from '@/components/ui';

import WithForm from '../components/WithForm';

const WITH_PASSWORD = 'passwordField';
const WITHOUT_PASSWORD = 'textField';

const defaultValues = {
    [WITH_PASSWORD]: '',
    [WITHOUT_PASSWORD]: '',
};

const pholder = (s: string) => `test-${s}`;

describe('FormTextInput Component', () => {
    describe('ARIA attributes', () => {
        it('check with label', () => {
            render(
                <WithForm defaultValues={defaultValues}>
                    <FormTextInput
                        name={WITHOUT_PASSWORD}
                        placeholder={pholder(WITHOUT_PASSWORD)}
                        label
                    />
                </WithForm>
            );

            const labelElement = screen.getByText(WITHOUT_PASSWORD);
            const inputElement = screen.getByPlaceholderText(pholder(WITHOUT_PASSWORD));

            expect(labelElement).toBeInTheDocument();
            expect(inputElement).toBeInTheDocument();

            expect(labelElement).toHaveAttribute('for', inputElement.id);
            expect(inputElement).toHaveAttribute('aria-labelledby', labelElement.id);
            expect(inputElement).toHaveAttribute(
                'aria-describedby',
                expect.stringMatching(/description|error/)
            );
        });

        it('check without label', () => {
            render(
                <WithForm defaultValues={defaultValues}>
                    <FormTextInput
                        name={WITH_PASSWORD}
                        placeholder={pholder(WITH_PASSWORD)}
                    />
                </WithForm>
            );

            const labelElement = screen.queryByText(WITH_PASSWORD);
            const inputElement = screen.getByPlaceholderText(pholder(WITH_PASSWORD));

            expect(labelElement).not.toBeInTheDocument();
            expect(inputElement).toBeInTheDocument();

            expect(inputElement).not.toHaveAttribute('aria-labelledby');
            expect(inputElement).toHaveAttribute(
                'aria-describedby',
                expect.stringMatching(/description|error/)
            );
        });
    });

    describe('Input compabitlity', () => {
        it('shows password toggle when name contains "password"', () => {
            render(
                <WithForm defaultValues={defaultValues}>
                    <FormTextInput name={WITH_PASSWORD} placeholder={WITH_PASSWORD} />
                </WithForm>
            );

            const toggleButton = screen.getByRole('button');
            expect(toggleButton).toBeInTheDocument();
        });

        it('does not show password toggle when name does not contain "password"', () => {
            render(
                <WithForm defaultValues={defaultValues}>
                    <FormTextInput
                        name={WITHOUT_PASSWORD}
                        placeholder={WITHOUT_PASSWORD}
                    />
                </WithForm>
            );

            expect(screen.queryByRole('button')).toBeNull();
        });

        it('toggles password visibility on button click', () => {
            render(
                <WithForm defaultValues={defaultValues}>
                    <FormTextInput
                        name={WITH_PASSWORD}
                        placeholder={pholder(WITH_PASSWORD)}
                    />
                </WithForm>
            );

            const inputElement = screen.getByPlaceholderText(pholder(WITH_PASSWORD));
            const toggleButton = screen.getByRole('button');

            fireEvent.click(toggleButton);
            expect(inputElement).toHaveAttribute('type', 'text');

            fireEvent.click(toggleButton);
            expect(inputElement).toHaveAttribute('type', 'password');
        });
    });
});
