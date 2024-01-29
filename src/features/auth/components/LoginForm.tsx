'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { type SignInResponse } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Button, Form, FormTextInput, toast } from '@/components/ui';
import { DEFAULT_REDIRECT } from '@/lib/constants';
import { LoginSchema, type LoginSchemaType } from '@/schemas';

export const LoginForm = ({
    login,
}: {
    login: (values: LoginSchemaType) => Promise<SignInResponse | undefined>;
}) => {
    const t = useTranslations('auth.login');
    const tMessages = useTranslations('auth.messages');

    const router = useRouter();

    const form = useForm<LoginSchemaType>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<LoginSchemaType> = async values => {
        login(values).then(callback => {
            if (callback?.ok) {
                toast({
                    title: tMessages('response.success'),
                    description: (
                        <span className="text-green-600">
                            {tMessages('server.loggedIn')}
                        </span>
                    ),
                });
                router.push(DEFAULT_REDIRECT);
            }

            if (callback?.error) {
                const { error } = callback;
                let message = error.toLowerCase();

                if (message.includes('password')) {
                    message = tMessages('password.invalid');

                    form.setError('password', {
                        message,
                    });
                }

                if (message.includes('email')) {
                    message = tMessages('email.notExist');

                    form.setError('email', {
                        message,
                    });
                }

                if (!message.includes('password') && !message.includes('email')) {
                    toast({
                        variant: 'destructive',
                        title: tMessages('response.error'),
                        description: message,
                    });
                }
            }
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

export default LoginForm;
