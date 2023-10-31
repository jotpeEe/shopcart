'use client';

import { useEffect } from 'react';

import { User } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import {
    Avatar,
    AvatarFallback,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui';
import { useNavLinks, useNavbar } from '@/hooks';

type LinkProps = {
    title: string;
    href: string;
    shortcut: string;
};

const UserNavHeader = () => {
    const session = useSession();
    const user = session.data?.user as User;

    return (
        <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                </p>
            </div>
        </DropdownMenuLabel>
    );
};

const UserNavItem = ({ title, href, shortcut }: LinkProps) => {
    const { handleRouteChange } = useNavbar();
    return (
        <DropdownMenuItem className="p-0">
            <Link
                onClick={() => handleRouteChange(title)}
                className="z-10 w-full py-1.5 pl-2"
                href={href}
            >
                {title}
            </Link>
            <DropdownMenuShortcut>⌘{shortcut}</DropdownMenuShortcut>
        </DropdownMenuItem>
    );
};

const UserNav = () => {
    const t = useTranslations('UserNav');
    const router = useRouter();
    const { links } = useNavLinks();

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            const action = {
                s: () => router.push(links[0].href),
                u: () => router.push(links[1].href),
                c: () => router.push(links[2].href),
                p: () => router.push(links[3].href),
                q: () => signOut({ callbackUrl: '/auth' }),
            }[e.key];

            if (action && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                action();
            }
        };

        document.addEventListener('keydown', handleKeydown);
        return () => document.removeEventListener('keydown', handleKeydown);
    }, [router, links]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="p-0" asChild>
                <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                >
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <UserNavHeader />
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {links.map((link, idx) => (
                        <UserNavItem key={idx} {...link} />
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() =>
                        signOut({
                            callbackUrl: '/auth',
                        })
                    }
                >
                    {t('logout')}
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserNav;
