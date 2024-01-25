import React, { type PropsWithChildren } from 'react';

import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';

import { FormTextInput } from '@/components/ui'; // Replace with the actual file path

const FIELD_NAME = 'testName';

export const FormExample = ({ children }: PropsWithChildren) => {
    const form = useForm({
        defaultValues: {
            FIELD_NAME: '',
        },
    });

    return <FormProvider {...form}>{children}</FormProvider>;
};

describe('FormTextInput Component', () => {
    it('check ARIA attributes with label', () => {
        render(
            <FormExample>
                <FormTextInput
                    name={FIELD_NAME}
                    placeholder="Test Placeholder"
                    label
                    noMessage
                />
            </FormExample>
        );

        const labelElement = screen.getByText('testName');
        const inputElement = screen.getByRole('textbox');

        expect(labelElement).toBeInTheDocument();
        expect(inputElement).toBeInTheDocument();

        expect(labelElement).toHaveAttribute('for', inputElement.id);
        expect(inputElement).toHaveAttribute('aria-labelledby', labelElement.id);
        expect(inputElement).toHaveAttribute(
            'aria-describedby',
            expect.stringMatching(/description|error/)
        );
    });

    it('check ARIA attributes without label', () => {
        render(
            <FormExample>
                <FormTextInput
                    name={FIELD_NAME}
                    placeholder="Test Placeholder"
                    noMessage
                />
            </FormExample>
        );

        const labelElement = screen.queryByText('testName');
        const inputElement = screen.getByRole('textbox');

        expect(labelElement).not.toBeInTheDocument();
        expect(inputElement).toBeInTheDocument();

        expect(inputElement).not.toHaveAttribute('aria-labelledby');
        expect(inputElement).toHaveAttribute(
            'aria-describedby',
            expect.stringMatching(/description|error/)
        );
    });
});
