'use client';

import React from 'react';

import { type AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';

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
            {children}
        </NextIntlClientProvider>
    );
};

export default Providers;
