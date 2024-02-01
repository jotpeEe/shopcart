import { NextIntlClientProvider } from 'next-intl';

import { type Locales } from '@/navigation';

type WithIntlProps = {
    children: React.ReactNode;
    locale: Locales;
};

jest.mock('next/navigation', () => ({
    usePathname: () => '/',
    useRouter: () => ({
        back: jest.fn(),
        forward: jest.fn(),
        refresh: jest.fn(),
        push: jest.fn(),
        prefetch: jest.fn(),
        replace: jest.fn(),
    }),
    useParams: () => ({ locale: 'en' }),
    useSelectedLayoutSegment: () => ({ locale: 'en' }),
}));

const WithIntl = ({ children, locale }: WithIntlProps) => {
    const messages = require(`../../messages/${locale}.json`);

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
        </NextIntlClientProvider>
    );
};

export default WithIntl;
