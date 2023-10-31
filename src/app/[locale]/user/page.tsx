import { redirect } from 'next/navigation';

import getCurrentUser from '@/lib/currentUser';

export default async function Home() {
    const user = await getCurrentUser();

    if (!user) {
        redirect('/auth');
    }

    if (user.role === 'ADMIN') {
        redirect(`/admin/${user.id}`);
    }

    redirect(`/user/${user.id}`);
}
