'use client';

import { startTransition } from 'react';
import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { register } from '@/actions/user/register';
import { Button, Form, FormTextInput, toast } from '@/components/ui';
import { DEFAULT_REDIRECT } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { RegisterSchema, type RegisterSchemaType } from '@/schemas';

export const RegisterForm = () => {
    const t = useTranslations('auth.register');
    const router = useRouter();

    const form = useForm<RegisterSchemaType>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            passwordConfirm: '',
        },
    });

    const onSubmit: SubmitHandler<RegisterSchemaType> = async values => {
        startTransition(() => {
            register(values).then(res => {
                const entry = Object.entries(res)[0];
                if (entry) {
                    const [key, value] = entry;
                    const error = key === 'error';

                    toast({
                        title: t(`${key}`),
                        description: (
                            <span className={cn(!error && 'text-green-600')}>
                                {value}
                            </span>
                        ),
                        variant: error ? 'destructive' : 'default',
                    });

                    if (!error) {
                        router.push(DEFAULT_REDIRECT);
                    }
                }
            });
        });
    };

    const inputs = Object.keys(form.getValues());
    const { isLoading } = form.formState;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-1">
                    {inputs.map((name, index) => (
                        <FormTextInput
                            key={`${name}-login`}
                            name={name}
                            placeholder={t(`placeholders.${index}`)}
                            disabled={isLoading}
                        />
                    ))}
                    <Button disabled={isLoading} className="mt-2">
                        {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                        {t('button')}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default RegisterForm;
