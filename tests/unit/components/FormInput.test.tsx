import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { FormInput } from '@/components/ui/input/form-input';

import WithForm from '../WithForm';

const WITH_PASSWORD = 'passwordField';
const WITHOUT_PASSWORD = 'textField';

const defaultValues = {
    [WITH_PASSWORD]: '',
    [WITHOUT_PASSWORD]: '',
};

const pholder = (s: string) => `test-${s}`;

describe('FormInput Component', () => {
    it('check with label', () => {
        render(
            <WithForm defaultValues={defaultValues}>
                <FormInput
                    name={WITHOUT_PASSWORD}
                    placeholder={pholder(WITHOUT_PASSWORD)}
                    label={WITHOUT_PASSWORD}
                />
            </WithForm>
        );

        const labelElement = screen.getByLabelText(WITHOUT_PASSWORD);
        const inputElement = screen.getByPlaceholderText(pholder(WITHOUT_PASSWORD));

        expect(labelElement).toBeInTheDocument();
        expect(inputElement).toBeInTheDocument();
    });

    it('check without label', () => {
        render(
            <WithForm defaultValues={defaultValues}>
                <FormInput name={WITH_PASSWORD} placeholder={pholder(WITH_PASSWORD)} />
            </WithForm>
        );

        const inputElement = screen.getByPlaceholderText(pholder(WITH_PASSWORD));

        expect(screen.queryByLabelText(WITH_PASSWORD)).not.toBeInTheDocument();
        expect(inputElement).toBeInTheDocument();
    });
    it('shows password toggle when name contains "password"', () => {
        render(
            <WithForm defaultValues={defaultValues}>
                <FormInput name={WITH_PASSWORD} placeholder={WITH_PASSWORD} />
            </WithForm>
        );

        const toggleButton = screen.getByRole('button');
        expect(toggleButton).toBeInTheDocument();
    });

    it('does not show password toggle when name does not contain "password"', () => {
        render(
            <WithForm defaultValues={defaultValues}>
                <FormInput name={WITHOUT_PASSWORD} placeholder={WITHOUT_PASSWORD} />
            </WithForm>
        );

        expect(screen.queryByRole('button')).toBeNull();
    });

    it('toggles password visibility on button click', () => {
        render(
            <WithForm defaultValues={defaultValues}>
                <FormInput name={WITH_PASSWORD} placeholder={pholder(WITH_PASSWORD)} />
            </WithForm>
        );

        const inputElement = screen.getByPlaceholderText(pholder(WITH_PASSWORD));
        const toggleButton = screen.getByRole('button');

        fireEvent.click(toggleButton);
        expect(inputElement).toHaveAttribute('type', 'text');

        fireEvent.click(toggleButton);
        expect(inputElement).toHaveAttribute('type', 'password');
    });

    it('focus input after visibility button clicked', () => {
        render(
            <WithForm defaultValues={defaultValues}>
                <FormInput name={WITH_PASSWORD} placeholder={pholder(WITH_PASSWORD)} />
            </WithForm>
        );

        const inputElement = screen.getByPlaceholderText(pholder(WITH_PASSWORD));
        const toggleButton = screen.getByRole('button');

        fireEvent.click(toggleButton);
        expect(inputElement).toHaveAttribute('type', 'text');
        expect(inputElement).toHaveFocus();
    });
});
