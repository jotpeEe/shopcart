import Link from 'next/link';
import { redirect } from 'next/navigation';

import { SignOut } from '@/components/navigation/NavigationSignOut';
import getCurrentUser from '@/lib/currentUser';

export default async function Home() {
    const user = await getCurrentUser();

    if (!user) {
        redirect('/auth');
    }

    return (
        <main className="flex max-h-screen flex-col">
            <div className="flex flex-col items-center justify-center gap-12">
                <span>Main Page</span>
                <SignOut />
                <Link href={`/user/${user.id}`}>Settings</Link>
            </div>
        </main>
    );
}
