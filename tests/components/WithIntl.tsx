import { NextIntlClientProvider } from 'next-intl';

import { type Locales } from '@/navigation';

type WithIntlProps = {
    children: React.ReactNode;
    locale: Locales;
};

const WithIntl = ({ children, locale }: WithIntlProps) => {
    const messages = require(`../../messages/${locale}.json`);

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
        </NextIntlClientProvider>
    );
};

export default WithIntl;
