import { FormEventHandler, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { SubmitHandler, UseFormReturn, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const formSchema = z.object({
    email: z.string().email().min(1, '| '),
    password: z.string().min(1, '| '),
});

type LoginInput = z.infer<typeof formSchema>;

export type LoginReturnType = {
    form: UseFormReturn<LoginInput>;
    handleSubmit: FormEventHandler<HTMLFormElement>;
    isLoading: boolean;
};

export const useLogin = () => {
    const t = useTranslations('useLogin');
    const router = useRouter();

    const form = useForm<LoginInput>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    useEffect(() => {
        const errors = Object.entries(form.formState.errors).map(
            error => error[0]
        );

        errors.forEach(error => {
            if (error === 'password') {
                form.setError(error, { message: t('passwordError') });
            }

            if (error === 'email') {
                form.setError(error, { message: t('emailError') });
            }
        });
    }, [t, form, form.formState.errors]);

    const onSubmit: SubmitHandler<LoginInput> = async values => {
        try {
            await signIn('credentials', {
                ...values,
                redirect: false,
            }).then(callback => {
                if (callback?.ok) {
                    toast.success('Logged in');
                    router.push('/home');
                }

                if (callback?.error) {
                    const { error } = callback;

                    toast.error(error);

                    if (error.toLowerCase().includes('password')) {
                        const message = t('passwordServerError');

                        form.setError('password', {
                            message,
                        });
                    }

                    if (error.toLowerCase().includes('email')) {
                        const message = t('emailServerError');

                        form.setError('email', {
                            message,
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
