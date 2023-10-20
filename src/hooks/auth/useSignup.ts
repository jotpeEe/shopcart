import { FormEventHandler, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { SubmitHandler, type UseFormReturn, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const formSchema = z
    .object({
        email: z.string().email().min(1),
        password: z.string().min(1),
        passwordConfirm: z.string().min(1),
    })
    .superRefine(({ passwordConfirm, password }, ctx) => {
        if (passwordConfirm !== password) {
            ctx.addIssue({
                code: 'custom',
                message: 'The passwords did not match',
                path: ['passwordConfirm'],
            });
        }
    });

type SignupInput = z.infer<typeof formSchema>;

export type SignupReturnType = {
    form: UseFormReturn<SignupInput>;
    handleSubmit: FormEventHandler<HTMLFormElement>;
    isLoading: boolean;
};

export const useSignup = () => {
    const t = useTranslations('useSignup');
    const router = useRouter();

    const form = useForm<SignupInput>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            passwordConfirm: '',
        },
    });

    useEffect(() => {
        const errors = Object.entries(form.formState.errors).map(
            error => error[0]
        );

        errors.forEach(error => {
            if (error === 'password' || error === 'passwordConfirm') {
                const message = t('passwordError');
                form.setError(error, { message });
            }

            if (error === 'email') {
                const message = t('emailError');
                form.setError(error, { message });
            }
        });
    }, [t, form, form.formState.errors]);

    const onSubmit: SubmitHandler<SignupInput> = async values => {
        try {
            const { email, password } = values;

            await axios
                .post('/api/register', {
                    email,
                    password,
                })
                .then(async res => {
                    console.log(res);
                    await signIn('credentials', {
                        email,
                        password,
                        redirect: false,
                    }).then(callback => {
                        if (callback?.ok) {
                            router.push('/home');
                        }
                    });
                });
        } catch (error: any) {
            console.log(error);
            const res = error?.response?.data;

            if (res?.toLowerCase().includes('email')) {
                const message = t('emailServerError');

                toast.error(message);
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
