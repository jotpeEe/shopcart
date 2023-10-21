import { useTranslations } from 'next-intl';
import { ImSpinner } from 'react-icons/im';

import { Button, Form } from '@/components/ui';
import useAuth from '@/hooks/auth/useAuth';

import { AuthFormitem } from './AuthFormItem';

const AuthSignup = () => {
    const t = useTranslations('AuthForm');
    const { form, handleSubmit, isLoading } = useAuth('signup');

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-1">
                    <AuthFormitem
                        name="email"
                        placeholder={t('emailPlaceholder')}
                        disabled={isLoading}
                    />
                    <AuthFormitem
                        name="password"
                        placeholder={t('password')}
                        type="password"
                        disabled={isLoading}
                    />
                    <AuthFormitem
                        name="passwordConfirm"
                        placeholder={t('password')}
                        type="password"
                        disabled={isLoading}
                    />
                    <Button disabled={isLoading} className="mt-2">
                        {isLoading && (
                            <ImSpinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {t('signIn')}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default AuthSignup;
