import { redirect } from 'next/navigation';

import getCurrentUser from '@/lib/currentUser';

export default async function UserSettingsPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect('/auth');
    }

    return <div className="space-y-6"></div>;
}
