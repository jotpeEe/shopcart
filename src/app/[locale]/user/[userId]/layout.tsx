import { Metadata } from 'next';

import { NavBar } from '@/components/navigation/NavBar';
import getCurrentUser from '@/lib/currentUser';

export const metadata: Metadata = {
    title: 'User settings',
};

interface SettingsLayoutProps {
    children: React.ReactNode;
}

export default async function SettingsLayout({
    children,
}: SettingsLayoutProps) {
    const user = await getCurrentUser();
    return (
        <section className="min-h-screen">
            <NavBar />
            <div className="mx-auto max-w-7xl p-12 ">{children}</div>
        </section>
    );
}
