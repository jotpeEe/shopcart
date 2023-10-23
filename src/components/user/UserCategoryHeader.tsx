'use client';

import { useTranslations } from 'next-intl';

export const UserCategoryHeader = ({
    name,
}: {
    name: 'AppearancePage' | 'UserPage';
}) => {
    const t = useTranslations(name);

    return (
        <div>
            <h3 className="text-lg font-medium">{t('title')}</h3>
            <p className="text-sm text-muted-foreground">{t('description')}</p>
        </div>
    );
};
