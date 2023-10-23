import { redirect } from 'next/navigation';

import { UserCategoryHeader, UserForm } from '@/components/user';
import getCurrentUser from '@/lib/currentUser';

export default async function UserSettingsPage({
    params,
}: {
    params: { userId: string };
}) {
    const user = await getCurrentUser();

    if (!user) {
        redirect('/auth');
    }

    if (user.id !== params.userId) {
        redirect(`/user/${user.id}`);
    }

    return (
        <div className="space-y-6">
            <UserCategoryHeader name="UserPage" />
            <UserForm user={user} />
        </div>
    );
}
