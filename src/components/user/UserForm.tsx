'use client';

import { useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useFieldArray, useForm } from 'react-hook-form';
import { BsLink45Deg } from 'react-icons/bs';
import * as z from 'zod';

import {
    Button,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Textarea,
    toast,
} from '@/components/ui';
import { cn } from '@/lib/utils';

export const UserForm = ({
    user: { id, name, email, bio, location },
}: {
    user: User;
}) => {
    const t = useTranslations('UserForm');
    const router = useRouter();

    const profileFormSchema = useMemo(
        () =>
            z.object({
                name: z
                    .string()
                    .min(2, {
                        message: 'Username must be at least 2 characters.',
                    })
                    .max(30, {
                        message:
                            'Username must not be longer than 30 characters.',
                    })
                    .optional(),
                email: z
                    .string({
                        required_error: 'Please select an email to display.',
                    })
                    .email(),
                bio: z.string().max(160).min(4),
                location: z.string().min(4),
                urls: z
                    .array(
                        z.object({
                            value: z
                                .string()
                                .url({ message: t('urlInvalidError') }),
                        })
                    )
                    .optional(),
            }),

        [t]
    );

    type UserFormValues = z.infer<typeof profileFormSchema>;

    const form = useForm<UserFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: name || '',
            email: email || undefined,
            bio: bio || undefined,
            location: location || undefined,
            urls: [
                { value: 'https://example.com' },
                { value: 'http://twitter.com/username' },
            ],
        },
        mode: 'onChange',
    });

    const { fields, append } = useFieldArray({
        name: 'urls',
        control: form.control,
    });

    const onSubmit = async (values: UserFormValues) => {
        try {
            console.log(values);
            const { bio, name, location } = values;
            toast({
                title: t('toast'),
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">
                            <>
                                {JSON.stringify(
                                    { bio, name, location },
                                    null,
                                    2
                                )}
                                {JSON.stringify(values, null, 2)}
                            </>
                        </code>
                    </pre>
                ),
            });

            await axios.patch(`/api/user/${id}`, { bio, name, location });
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('nameLabel')}</FormLabel>
                            <FormControl>
                                <Input
                                    className="w-fit"
                                    placeholder={field.value}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                {t('nameDescription')}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <Select onValueChange={field.onChange}>
                                <FormControl>
                                    <SelectTrigger className="w-fit space-x-2">
                                        <SelectValue placeholder="Select a verified email to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="w-fit">
                                    <SelectItem value={field.value}>
                                        {field.value}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                {t('emailDescription')}{' '}
                                <Link href="/user" className="underline">
                                    {t('emailDescriptionLink')}
                                </Link>
                                .
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us a little bit about yourself"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                {t('bioDescriptionPre')}{' '}
                                <span>{t('bioDescriptionLink')}</span>
                                {t('bioDescriptionPost')}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('locationLabel')}</FormLabel>
                            <FormControl>
                                <Input
                                    className="w-fit"
                                    placeholder={field.value}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                {t('locationDescription')}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    {fields.map((field, index) => (
                        <FormField
                            control={form.control}
                            key={field.id}
                            name={`urls.${index}.value`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel
                                        className={cn(index !== 0 && 'sr-only')}
                                    >
                                        URLs
                                    </FormLabel>
                                    <FormDescription
                                        className={cn(index !== 0 && 'sr-only')}
                                    >
                                        {t('urlsDescription')}
                                    </FormDescription>
                                    <div className="flex items-center space-x-2">
                                        <BsLink45Deg className="h-5 w-5 text-muted-foreground" />
                                        <FormControl>
                                            <Input
                                                placeholder={field.value}
                                                {...field}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => append({ value: '' })}
                    >
                        {t('addUrl')}
                    </Button>
                </div>
                <Button type="submit" onClick={() => form.resetField('urls')}>
                    {t('submit')}
                </Button>
            </form>
        </Form>
    );
};
