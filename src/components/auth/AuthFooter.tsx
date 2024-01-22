'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import { Link } from '@/components/ui/link';

const LazyLocaleSwitcher = dynamic(() => import('../LocaleSwitcher'), {
    loading: () => <p>...</p>,
});

const LazyThemeSwitch = dynamic(() => import('../ThemeSwitch'), {
    loading: () => <p>...</p>,
});

const AuthFooter = () => {
    const t = useTranslations('auth.footer');

    const links = [
        {
            href: '/terms-and-conditions',
            text: t('notice'),
        },
        {
            href: '/terms-and-conditions',
            text: t('terms'),
        },
        {
            href: '/',
            text: t('cookies'),
        },
    ];

    return (
        <footer className="absolute bottom-0 left-0 mx-[72px] mb-0 mt-0 grid grid-cols-8 gap-3 uppercase lg:mx-12 lg:mb-6 lg:mt-4">
            <div className="col-span-8 flex items-center gap-2 text-[10px] font-bold">
                {links.map(({ href, text }) => (
                    <Link key={text} href={href}>
                        {text}
                    </Link>
                ))}
                <LazyLocaleSwitcher />
                <LazyThemeSwitch />
            </div>
            <span className="col-span-8 text-[8px] tracking-wider text-gray-500">
                {t('hcaptcha.pre')}{' '}
                <Link href="https://hcaptcha.com/privacy" external className="underline">
                    {t('notice')}
                </Link>{' '}
                {t('hcaptcha.and')}{' '}
                <Link href="https://hcaptcha.com/terms" external className="underline">
                    {t('terms')}
                </Link>{' '}
                {t('hcaptcha.post')}.
            </span>
        </footer>
    );
};

export default AuthFooter;
