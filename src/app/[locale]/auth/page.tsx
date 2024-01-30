import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { Auth } from '@/features/auth';
import { authOptions } from '@/lib/auth';
import { DEFAULT_REDIRECT } from '@/lib/constants';

const AuthPage = async () => {
    const session = await getServerSession(authOptions);

    if (session?.user) {
        redirect(DEFAULT_REDIRECT);
    }

    return (
        <section className="flex h-screen items-center justify-center p-12">
            <Auth />
        </section>
    );
};

export default AuthPage;
