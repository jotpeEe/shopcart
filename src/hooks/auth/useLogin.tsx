import { useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { toast } from '@/components/ui';

export const useLogin = () => {
    const t = useTranslations('useLogin');
    const router = useRouter();

    const formSchema = useMemo(
        () =>
            z.object({
                email: z
                    .string()
                    .min(1, t('emailEmptyError'))
                    .email({ message: t('emailInvalidError') }),
                password: z.string().min(1, t('passwordEmptyError')),
            }),
        [t]
    );

    type LoginInput = z.infer<typeof formSchema>;

    const form = useForm<LoginInput>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<LoginInput> = async values => {
        try {
            await signIn('credentials', {
                ...values,
                redirect: false,
            }).then(callback => {
                if (callback?.ok) {
                    toast({
                        description: (
                            <span>
                                {t('toastPre')}{' '}
                                <span className="text-green-600">
                                    {t('toastGreen')}
                                </span>{' '}
                                {t('toastPost')}
                            </span>
                        ),
                    });
                    router.push('/home');
                }

                if (callback?.error) {
                    const { error } = callback;

                    if (error.toLowerCase().includes('password')) {
                        const message = t('passwordServerError');

                        form.setError('password', {
                            message,
                        });

                        toast({
                            variant: 'destructive',
                            title: t('serverErrorTitle'),
                            description: message,
                        });
                    }

                    if (error.toLowerCase().includes('email')) {
                        const message = t('emailNotExistError');

                        form.setError('email', {
                            message,
                        });

                        toast({
                            variant: 'destructive',
                            title: t('serverErrorTitle'),
                            description: message,
                        });
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    return {
        form,
        handleSubmit: form.handleSubmit(onSubmit),
        isLoading: form.formState.isSubmitting,
    };
};
