import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/en/auth');
});

test('main navigation', async ({ page }) => {
    await expect(page).toHaveURL('http://localhost:3000/en/auth');
});

test('Renders login form initially', async ({ page }) => {
    await expect(page.getByPlaceholder('Email')).toBeInViewport();
    await expect(page.getByPlaceholder('Password')).toBeInViewport();
    await expect(page.getByRole('button', { name: 'Sign up' })).toBeInViewport();
});

test('Switches to sign up form when clicked', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign up' }).click();

    await expect(page.getByPlaceholder('Email')).toBeInViewport();
    await expect(page.getByPlaceholder('Password', { exact: true })).toBeInViewport();
    await expect(page.getByPlaceholder('Confirm Password')).toBeInViewport();

    await expect(page.getByRole('button', { name: 'Log in' })).toBeInViewport();
});

test('Switches between light and dark themes', async ({ page }) => {
    await expect(page.locator('html')).toHaveClass('dark');
    await expect(page.locator('html')).toHaveAttribute('style', 'color-scheme: dark;');

    await page.getByTestId('ThemeSwitch').click();

    await expect(page.locator('html')).toHaveClass('light');
    await expect(page.locator('html')).toHaveAttribute('style', 'color-scheme: light;');
});
