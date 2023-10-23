import { Locales, locales } from '@/navigation';

const pl = [
    { label: 'Angielski', value: 'en' },
    { label: 'Francuski', value: 'fr' },
    { label: 'Niemiecki', value: 'de' },
    { label: 'Hiszpański', value: 'es' },
    { label: 'Portugalski', value: 'pt' },
    { label: 'Polski', value: 'pl' },
    { label: 'Rosyjski', value: 'ru' },
    { label: 'Japoński', value: 'ja' },
    { label: 'Koreański', value: 'ko' },
    { label: 'Chiński', value: 'zh' },
] as const;

const en = [
    { label: 'English', value: 'en' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Spanish', value: 'es' },
    { label: 'Portuguese', value: 'pt' },
    { label: 'Polish', value: 'pl' },
    { label: 'Russian', value: 'ru' },
    { label: 'Japanese', value: 'ja' },
    { label: 'Korean', value: 'ko' },
    { label: 'Chinese', value: 'zh' },
] as const;

const languages = {
    en,
    pl,
};

export const usedLanguages = (locale: Locales) => {
    return languages[locale].filter(lang =>
        locales.includes(lang.value as Locales)
    );
};
