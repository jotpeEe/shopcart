'use client';

import React, { useState } from 'react';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import AuthFooter from './AuthFooter';
import AuthFormSkeleton from './AuthFormSkeleton';
import OAuthButtonSkeleton from './OAuthButtonsSkeleton';

const LazyOAuthButtonGroup = dynamic(() => import('./OAuthButtons'), {
    loading: () => <OAuthButtonSkeleton />,
});

const LazyAuthForm = dynamic(() => import('./AuthForm'), {
    loading: () => <AuthFormSkeleton />,
});

type AuthFormSwitch = {
    callToAction: string;
    question: string;
    onClick: () => void;
};

const AuthFormSwitch = ({ callToAction, question, onClick }: AuthFormSwitch) => (
    <div className="mt-6 flex justify-center gap-2 px-2 text-sm ">
        <div className="text-stone-800 dark:text-gray-500">{question}</div>
        <div className="cursor-pointer underline" onClick={onClick}>
            {callToAction}
        </div>
    </div>
);

type HeaderProps = {
    header: string;
    description: string;
};

const Header = ({ header, description }: HeaderProps) => (
    <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{header}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
    </div>
);

const Separator = ({ text }: { text: string }) => (
    <div className="relative">
        <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">{text}</span>
        </div>
    </div>
);

export type FormVariant = 'login' | 'register';

const Auth = () => {
    const [variant, setVariant] = useState<FormVariant>('login');

    const t = useTranslations('auth');

    const header = t(`${variant}.header`);
    const description = t(`${variant}.description`);
    const separator = t(`${variant}.separator`);
    const question = t(`${variant}.question`);
    const callToAction = t(`${variant}.callToAction`);

    const toggleVariant = () => setVariant(variant === 'login' ? 'register' : 'login');

    return (
        <>
            <div className="mx-auto grid gap-6 sm:w-[350px]">
                <Header header={header} description={description} />
                <LazyAuthForm formType={variant} />
                <Separator text={separator} />
                <LazyOAuthButtonGroup providers={['github', 'google']} />
                <AuthFormSwitch
                    question={question}
                    callToAction={callToAction}
                    onClick={toggleVariant}
                />
            </div>
            <AuthFooter />
        </>
    );
};

export default Auth;
