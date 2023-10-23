'use client';

import { HTMLAttributes, useMemo } from 'react';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui';
import { cn } from '@/lib/utils';

export function UserSidebarNav({
    className,
    ...props
}: HTMLAttributes<HTMLElement>) {
    const t = useTranslations('UserSidebarNav');
    const pathname = usePathname();
    const locale = useLocale();
    const params = useParams<{ userId: string; locale: string }>();

    const items = useMemo(
        () => [
            {
                title: t('user'),
                href: `${
                    locale !== 'en' ? `/${locale}` : ''
                }/user/${params?.userId}`,
            },
            {
                title: t('appearance'),
                href: `${
                    locale !== 'en' ? `/${locale}` : ''
                }/user/${params?.userId}/appearance`,
            },
        ],
        [params, locale, t]
    );

    return (
        <nav
            className={cn(
                'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
                className
            )}
            {...props}
        >
            {items.map(item => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        pathname === item.href
                            ? 'bg-muted hover:bg-muted'
                            : 'hover:bg-transparent hover:underline',
                        'justify-start'
                    )}
                >
                    {item.title}
                </Link>
            ))}
        </nav>
    );
}
