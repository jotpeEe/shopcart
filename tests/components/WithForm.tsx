import { FormProvider, useForm } from 'react-hook-form';

import { Toaster } from '@/components/ui/toaster';
import { type Locales } from '@/navigation';

import WithIntl from './WithIntl';

type WithFormProps = {
    children: React.ReactNode;
    defaultValues: {
        [key: string]: unknown;
    };
    lang?: Locales;
};

const WithForm = ({ children, defaultValues, lang = 'en' }: WithFormProps) => {
    const form = useForm({
        defaultValues,
    });

    return (
        <WithIntl locale={lang}>
            <FormProvider {...form}>{children}</FormProvider>
            <Toaster />
        </WithIntl>
    );
};

export default WithForm;
