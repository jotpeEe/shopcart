import { UserAppearanceForm, UserCategoryHeader } from '@/components/user';

export default function SettingsAppearancePage() {
    return (
        <div className="space-y-6">
            <UserCategoryHeader name="AppearancePage" />
            <UserAppearanceForm />
        </div>
    );
}
