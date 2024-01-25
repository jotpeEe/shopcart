import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { Input } from '@/components/ui';

describe('Input Component', () => {
    it('toggles password visibility on button click', () => {
        render(<Input type="password" placeholder="testName" />);

        const inputElement = screen.getByPlaceholderText('testName') as HTMLInputElement;
        const toggleButton = screen.getByRole('button');

        expect(inputElement.type).toBe('password');
        fireEvent.click(toggleButton);

        expect(inputElement.type).toBe('text');
        fireEvent.click(toggleButton);

        expect(inputElement.type).toBe('password');
    });

    it('focuses on the input when clicking the visibility toggle button', () => {
        render(<Input type="password" placeholder="testName" />);

        const inputElement = screen.getByPlaceholderText('testName') as HTMLInputElement;
        const toggleButton = screen.getByRole('button');

        fireEvent.click(toggleButton);

        expect(inputElement).toHaveFocus();
    });
});
