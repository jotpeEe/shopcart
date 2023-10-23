'use client';

import { useMemo, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next-intl/client';
import { useTheme } from 'next-themes';
import { useForm } from 'react-hook-form';
import { BiCheck } from 'react-icons/bi';
import { RxCaretSort } from 'react-icons/rx';
import * as z from 'zod';

import {
    Button,
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Popover,
    PopoverContent,
    PopoverTrigger,
    RadioGroup,
    RadioGroupItem,
    toast,
} from '@/components/ui';
import { usedLanguages } from '@/lib/usedLanguages';
import { cn } from '@/lib/utils';
import { Locales, locales } from '@/navigation';

const appearanceFormSchema = z.object({
    theme: z
        .enum(['light', 'dark'], {
            required_error: 'Please select a theme.',
        })
        .optional(),
    language: z
        .enum(locales, {
            required_error: 'Please select a language.',
        })
        .optional(),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

const defaultValues: Partial<AppearanceFormValues> = {
    theme: 'light',
};

export const UserAppearanceForm = () => {
    const { theme: currTheme, setTheme } = useTheme();
    const t = useTranslations('AppearanceForm');
    const [isPending, startTransition] = useTransition();
    const currLocale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const languages = useMemo(
        () => usedLanguages(currLocale as Locales),
        [currLocale]
    );

    const form = useForm<AppearanceFormValues>({
        resolver: zodResolver(appearanceFormSchema),
        defaultValues: async () => {
            const theme = (await currTheme) as 'dark' | 'light' | undefined;
            const locale = (await currLocale) as Locales;
            return {
                theme,
                language: locale,
            };
        },
    });

    function onSubmit(data: AppearanceFormValues) {
        toast({
            title: t('toast'),
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        });

        if (data.theme) setTheme(data.theme);

        if (currLocale !== data.language && pathname) {
            startTransition(() => {
                router.replace(pathname, { locale: data.language });
            });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>{t('langLabel')}</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                'w-[200px] justify-between',
                                                !field.value &&
                                                    'text-muted-foreground'
                                            )}
                                        >
                                            {field.value
                                                ? languages.find(
                                                      language =>
                                                          language?.value ===
                                                          field.value
                                                  )?.label
                                                : t('selectLang')}
                                            <RxCaretSort className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput
                                            placeholder={t(
                                                'searchLangPlaceholder'
                                            )}
                                        />
                                        <CommandEmpty>
                                            {t('searchLangCommand')}
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {languages.map(language => (
                                                <CommandItem
                                                    value={language?.label}
                                                    key={language?.value}
                                                    onSelect={() => {
                                                        form.setValue(
                                                            'language',
                                                            language?.value as Locales
                                                        );
                                                    }}
                                                >
                                                    <BiCheck
                                                        className={cn(
                                                            'mr-2 h-4 w-4',
                                                            language?.value ===
                                                                field.value
                                                                ? 'opacity-100'
                                                                : 'opacity-0'
                                                        )}
                                                    />
                                                    {language?.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                {t('langDescription')}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel>{t('themeLabel')}</FormLabel>
                            <FormDescription>
                                {t('themeDescription')}
                            </FormDescription>
                            <FormMessage />
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid max-w-md grid-cols-2 gap-8 pt-2"
                            >
                                <FormItem>
                                    <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                                        <FormControl>
                                            <RadioGroupItem
                                                value="light"
                                                className="sr-only"
                                            />
                                        </FormControl>
                                        <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                                            <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                                                <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                                    <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                                                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                                </div>
                                                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                                </div>
                                                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                                </div>
                                            </div>
                                        </div>
                                        <span className="block w-full p-2 text-center font-normal">
                                            {t('themeLight')}
                                        </span>
                                    </FormLabel>
                                </FormItem>
                                <FormItem>
                                    <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                                        <FormControl>
                                            <RadioGroupItem
                                                value="dark"
                                                className="sr-only"
                                            />
                                        </FormControl>
                                        <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                                            <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                                                <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                                    <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                                                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                                </div>
                                                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                                                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                                </div>
                                                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                                                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                                </div>
                                            </div>
                                        </div>
                                        <span className="block w-full p-2 text-center font-normal">
                                            {t('themeDark')}
                                        </span>
                                    </FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormItem>
                    )}
                />

                <Button type="submit">{t('submitButton')}</Button>
            </form>
        </Form>
    );
};
