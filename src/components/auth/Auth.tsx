'use client';

import React, { useState } from 'react';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

const LazyAuthSocials = dynamic(() => import('./AuthSocials'), {
    loading: () => <p>Loading...</p>,
});

const LazyAuthForm = dynamic(() => import('./AuthForm'));

export const Auth = () => {
    const [variant, setVariant] = useState<'login' | 'register'>('login');

    const t = useTranslations('auth');

    const header = t(`${variant}.header`);
    const description = t(`${variant}.description`);
    const separator = t(`${variant}.separator`);
    const question = t(`${variant}.question`);
    const callToAction = t(`${variant}.callToAction`);

    const toggleVariant = () => setVariant(variant === 'login' ? 'register' : 'login');

    return (
        <div className={'grid gap-6'}>
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">{header}</h1>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <LazyAuthForm login={variant === 'login'} />
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        {separator}
                    </span>
                </div>
            </div>
            <LazyAuthSocials providers={['github', 'google']} />
            <div className="mt-6 flex justify-center gap-2 px-2 text-sm ">
                <div className="text-stone-800 dark:text-gray-500">{question}</div>
                <div className="cursor-pointer underline" onClick={toggleVariant}>
                    {callToAction}
                </div>
            </div>
        </div>
    );
};
