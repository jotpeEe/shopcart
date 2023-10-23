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
        <section className="min-h-screen">
            <div className="mx-auto max-w-7xl">
                <div className="hidden space-y-6 p-10 pb-16 md:block">
                    <UserHeader />
                    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                        <aside className="-mx-4 lg:w-1/6">
                            <UserSidebarNav />
                        </aside>
                        <div className="flex-1 lg:max-w-2xl">{children}</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
