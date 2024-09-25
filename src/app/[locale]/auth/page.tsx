import { redirect } from 'next/navigation';

import { TopLeftShine } from '@/components/icons/test';
import AuthClient from '@/features/auth/components/AuthClient';
import { getServerAuthSession } from '@/lib/auth';
import { DEFAULT_REDIRECT } from '@/lib/constants';

const AuthPage = async () => {
  const session = await getServerAuthSession();

  if (session?.user) {
    redirect(DEFAULT_REDIRECT);
  }

  return (
    <section className="flex h-screen items-center justify-center">
      <div className="pointer-events-none absolute left-[20vw] top-0 flex w-[80vw] justify-start overflow-hidden">
        <TopLeftShine />
      </div>
      <AuthClient />
    </section>
  );
};

export default AuthPage;
