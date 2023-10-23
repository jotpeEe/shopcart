'use client';

import { useTranslations } from 'next-intl';

export const UserHeader = () => {
    const t = useTranslations('UserSettings');

    return (
        <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">{t('title')}</h2>
            <p className="text-muted-foreground">{t('description')}</p>
        </div>
    );
};
