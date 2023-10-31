import { Metadata } from 'next';

import { UserHeader, UserSidebarNav } from '@/components/user';

export const metadata: Metadata = {
    title: 'User settings',
};

interface SettingsLayoutProps {
    children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <div className="space-y-6 pb-16">
            <UserHeader />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/6">
                    <UserSidebarNav />
                </aside>
                <div className="flex-1 lg:max-w-2xl">{children}</div>
            </div>
        </div>
    );
}
