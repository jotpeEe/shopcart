'use client';

import { useTransition } from 'react';

import { Globe, Loader } from 'lucide-react';
import { useLocale } from 'next-intl';

import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui';
import { locales, usePathname, useRouter } from '@/navigation';

const LocaleSwitcher = () => {
    const [isPending, startTransition] = useTransition();
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const onSelectChange = (value: string) => {
        const nextLocale = value;
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="flex items-center gap-1.5">
                <Button className="h-6 bg-stone-700 px-2.5 py-1.5 text-xs uppercase text-white/70 hover:bg-stone-600">
                    <span className="sc-oQLfA gzAcBg">{locale}</span>
                    {isPending ? (
                        <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                        <Globe className="h-4 w-4 text-stone-500 dark:text-stone-400" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-fit">
                {locales.map(item => (
                    <DropdownMenuItem key={item} onClick={() => onSelectChange(item)}>
                        {item}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LocaleSwitcher;
