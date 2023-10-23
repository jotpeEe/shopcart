import { useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

export const useSignup = () => {
    const t = useTranslations('useSignup');
    const router = useRouter();

    const formSchema = useMemo(
        () =>
            z
                .object({
                    email: z
                        .string()
                        .min(1, { message: t('emailEmptyError') })
                        .email({ message: t('emailInvalidError') }),
                    password: z
                        .string()
                        .min(1, { message: t('passwordEmptyError') }),
                    passwordConfirm: z
                        .string()
                        .min(1, { message: t('passwordEmptyError') }),
                })
                .superRefine(({ passwordConfirm, password }, ctx) => {
                    if (passwordConfirm !== password) {
                        ctx.addIssue({
                            code: 'custom',
                            message: t('passwordNoMatchError'),
                            path: ['passwordConfirm'],
                        });
                    }
                }),
        [t]
    );

    type SignupInput = z.infer<typeof formSchema>;

    const form = useForm<SignupInput>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            passwordConfirm: '',
        },
    });

    const onSubmit: SubmitHandler<SignupInput> = async values => {
        try {
            const { email, password } = values;

            await axios
                .post('/api/register', {
                    email,
                    password,
                })
                .then(async () => {
                    await signIn('credentials', {
                        email,
                        password,
                        callbackUrl: '/home',
                    });
                });
        } catch (error: any) {
            console.log(error);
            const data = error?.response?.data;

            if (data?.toLowerCase().includes('email')) {
                const message = t('emailAlreadyExistsError');

                form.setError('email', { message });
            }
        }
    };

    return {
        form,
        isLoading: form.formState.isSubmitting,
        handleSubmit: form.handleSubmit(onSubmit),
    };
};
