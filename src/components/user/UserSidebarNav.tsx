'use client';

import { HTMLAttributes, useMemo } from 'react';

import { UserRole } from '@prisma/client';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui';
import { cn } from '@/lib/utils';

export function UserSidebarNav({
    className,
    role,
    ...props
}: HTMLAttributes<HTMLElement> & { role?: UserRole }) {
    const t = useTranslations('UserSidebarNav');
    const pathname = usePathname();
    const params = useParams<{
        userId?: string;
        locale: string;
        adminId?: string;
    }>();

    const items = useMemo(
        () => [
            {
                title: t('user'),
                href: `${
                    params?.locale !== 'en' ? `/${params?.locale}` : ''
                }/user/${params?.userId}/settings`,
            },
            {
                title: t('appearance'),
                href: `${
                    params?.locale !== 'en' ? `/${params?.locale}` : ''
                }/user/${params?.userId}/settings/appearance`,
            },
        ],
        [params, t]
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
