'use client';

import React from 'react';

import { Loader } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormInput } from '@/components/ui/input/form-input';
import { toast } from '@/components/ui/use-toast';
import { DEFAULT_REDIRECT } from '@/lib/constants';
import { cn } from '@/lib/utils';

import { RegisterSchema } from './schemas';
import useAuthForm from '../hooks/useAuthForm';
import { type RegisterType } from '../services/register';

const RegisterForm = ({
    register,
    disabled = false,
}: {
    register: RegisterType;
    disabled?: boolean;
}) => {
    const t = useTranslations('auth');

    const defaultValues = {
        email: '',
        password: '',
        passwordConfirm: '',
    };

    const { form, handleSubmit, isSubmitting } = useAuthForm({
        defaultValues,
        schema: RegisterSchema,
        action: register,
        onSuccess: () => {
            toast({
                title: t('messages.response.success'),
                description: (
                    <span className="text-green-600">
                        {t('messages.server.signedIn')}
                    </span>
                ),
            });
        },
        redirectUrl: DEFAULT_REDIRECT,
    });

    const inputs = Object.keys(defaultValues);

    return (
        <Form {...form}>
            <form className="m-1.5 h-[264px]" onSubmit={handleSubmit}>
                <div className={cn('grid gap-2', disabled && 'hidden')}>
                    {inputs.map((name, index) => (
                        <FormInput
                            key={`${name}-login`}
                            name={name}
                            placeholder={t(`register.placeholders.${index}`)}
                            disabled={isSubmitting}
                        />
                    ))}
                    <Button disabled={isSubmitting}>
                        {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                        {t('register.button')}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default RegisterForm;
