'use client';

import React from 'react';

import { type AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';

type ProvidersProps = {
    messages: AbstractIntlMessages | undefined;
    locale: string;
    children: React.ReactNode;
};

const Providers: React.FC<ProvidersProps> = ({ children, messages, locale }) => {
    return (
        <NextIntlClientProvider
            locale={locale}
            messages={messages}
            timeZone="Europe/London"
        >
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem={false}
                storageKey="test-theme"
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </NextIntlClientProvider>
    );
};

export default Providers;
