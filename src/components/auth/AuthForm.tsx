'use client';

import * as React from 'react';
import { useCallback, useState } from 'react';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { FaGithub, FaGoogle } from 'react-icons/fa';

import AuthLogin from './AuthLogin';
import { AuthSocialButton } from './AuthSocialButton';

const AuthSignup = dynamic(() => import('./AuthSignup'), {
    loading: () => <p>Loading...</p>,
});

type Variant = 'LOGIN' | 'SIGNUP';

export function AuthForm() {
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const t = useTranslations('AuthForm');

    const toggleVariant = useCallback(() => {
        setVariant(variant === 'LOGIN' ? 'SIGNUP' : 'LOGIN');
    }, [variant]);

    return (
        <div className={'grid gap-6'}>
            {variant === 'LOGIN' ? <AuthLogin /> : <AuthSignup />}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        {t('separator')}
                    </span>
                </div>
            </div>
            <div className="flex w-full gap-2">
                <AuthSocialButton type="github">
                    <FaGithub className="h-4 w-4" />
                </AuthSocialButton>
                <AuthSocialButton type="google">
                    <FaGoogle className="h-4 w-4" />
                </AuthSocialButton>
            </div>
            <div className="mt-6 flex justify-center gap-2 px-2 text-sm ">
                <div className="text-stone-800 dark:text-gray-500">
                    {variant === 'LOGIN'
                        ? t('question')
                        : 'Already have an account?'}
                </div>
                <div
                    className="cursor-pointer underline"
                    onClick={toggleVariant}
                >
                    {variant === 'LOGIN' ? t('callToAction') : 'Login'}
                </div>
            </div>
        </div>
    );
}
