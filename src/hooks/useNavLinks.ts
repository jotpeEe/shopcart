import { useParams, usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

const useNavLink = () => {
    const t = useTranslations('UserNav');
    const params = useParams();
    const locale = useLocale();
    const pathname = usePathname();
    const prefix = `${locale === 'pl' ? '/pl' : ''}/user/${params?.userId}`;

    const links = [
        {
            title: t('linkTitleProfile'),
            href: `${prefix}`,
            shortcut: 'u',
        },
        {
            title: t('linkTitleCustomers'),
            href: `${prefix}/customers`,
            shortcut: 'c',
        },
        {
            title: t('linkTitleProducts'),
            href: `${prefix}/products`,
            shortcut: 'p',
        },
        {
            title: t('linkTitleSettings'),
            href: `${prefix}/settings`,
            shortcut: 's',
        },
    ] as const;

    const index = links.findIndex(
        (link, index) => index !== 0 && pathname?.includes(link.href)
    );

    const indexActive = index === -1 ? 0 : index;

    return { links, indexActive };
};

export default useNavLink;
