import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { Auth } from '@/components/auth/Auth';
import AuthFooter from '@/components/auth/AuthFooter';
import { authOptions } from '@/lib/auth';
import { DEFAULT_REDIRECT } from '@/lib/constants';

const AuthPage = async () => {
    const session = await getServerSession(authOptions);

    if (session?.user) {
        redirect(DEFAULT_REDIRECT);
    }

    return (
        <section className="flex max-h-screen flex-col">
            <div className="flex h-screen items-center justify-center p-12">
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <Auth />
                    </div>
                </div>
            </div>
            <AuthFooter />
        </section>
    );
};

export default AuthPage;
