'use client';

import { useTranslations } from 'next-intl';

import { ModeToggle } from '..';
import LocaleSwitcher from '../LocaleSwitcher';

const AuthFooter = () => {
    const t = useTranslations('AuthFooter');
    return (
        <footer className="absolute bottom-0 left-0 mx-[72px] mb-0 mt-0 grid grid-cols-8 gap-3 uppercase lg:mx-12 lg:mb-6 lg:mt-4">
            <div className="col-span-8 flex items-center gap-2 text-[10px] font-bold">
                <span>
                    <a target="_blank" href="/">
                        {t('notice')}
                    </a>
                </span>
                <span>
                    <a target="_blank" href="/">
                        {t('terms')}
                    </a>
                </span>
                <span>
                    <a href="#">{t('cookies')}</a>
                </span>
                <LocaleSwitcher />
                <ModeToggle />
            </div>
            <div className="col-span-8 flex flex-row text-[8px] tracking-wider text-gray-500">
                <span>
                    {t('hcaptcha')}{' '}
                    <a
                        href="https://hcaptcha.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                    >
                        {t('notice')}
                    </a>{' '}
                    {t('&')}{' '}
                    <a
                        href="https://hcaptcha.com/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                    >
                        {t('terms')}
                    </a>{' '}
                    {t('end')}.
                </span>
            </div>
        </footer>
    );
};

export default AuthFooter;
