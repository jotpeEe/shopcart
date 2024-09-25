import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';

import Providers from '@/components/Providers';
import { getServerAuthSession } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { locales } from '@/navigation';

import './globals.css';

export const metadata: Metadata = {
  title: 'Shopcart',
  description: 'E-commerce example',
};

type RootLayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export const generateStaticParams = () => locales.map(locale => ({ locale }));

const LocaleLayout = async ({ children, params: { locale } }: RootLayoutProps) => {
  unstable_setRequestLocale(locale);

  const messages = await getMessages();
  const session = await getServerAuthSession();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          GeistSans.variable
        )}
        suppressHydrationWarning
      >
        <Providers locale={locale} messages={messages} session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default LocaleLayout;
