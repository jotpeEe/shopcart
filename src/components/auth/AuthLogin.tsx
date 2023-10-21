import { useTranslations } from 'next-intl';
import { ImSpinner } from 'react-icons/im';

import { Button, Form } from '@/components/ui';
import useAuth from '@/hooks/auth/useAuth';

import { AuthFormitem } from './AuthFormItem';

const AuthLogin = () => {
    const t = useTranslations('AuthForm');
    const { form, isLoading, handleSubmit } = useAuth('login');

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-1">
                    <AuthFormitem
                        name="email"
                        componentName="useLogin"
                        placeholder={t('emailPlaceholder')}
                        disabled={isLoading}
                    />
                    <AuthFormitem
                        name="password"
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

export default AuthLogin;
