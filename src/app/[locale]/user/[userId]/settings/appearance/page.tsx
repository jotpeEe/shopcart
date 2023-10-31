import dynamic from 'next/dynamic';

import { UserCategoryHeader } from '@/components/user';

const UserAppearanceForm = dynamic(
    () => import('../../../../../../components/user/UserAppearanceForm')
);

export default function SettingsAppearancePage() {
    return (
        <div className="space-y-6">
            <UserCategoryHeader name="AppearancePage" />
            <UserAppearanceForm />
        </div>
    );
}
