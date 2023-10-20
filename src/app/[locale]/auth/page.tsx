import { useTranslations } from 'next-intl';

import { AuthForm } from '@/components';
import { AuthFooter } from '@/components/auth/AuthFooter';

export default function Auth() {
    const t = useTranslations('Home');

    return (
        <section className="flex max-h-screen flex-col">
            <div className="flex h-screen items-center justify-center p-12">
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {t('title')}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {t('description')}.
                            </p>
                        </div>
                        <AuthForm />
                    </div>
                </div>
            </div>
            <AuthFooter />
        </section>
    );
}
