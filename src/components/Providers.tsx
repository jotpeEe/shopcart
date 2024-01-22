'use client';

import React from 'react';

import { SessionProvider } from 'next-auth/react';
import { type AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';

import { Toaster } from '@/components/ui/toaster';

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
                <SessionProvider>
                    {children}
                    <Toaster />
                </SessionProvider>
            </ThemeProvider>
        </NextIntlClientProvider>
    );
};

export default Providers;
