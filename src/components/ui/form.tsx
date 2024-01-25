'use client';

import * as React from 'react';

import type * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import { useTranslations } from 'next-intl';
import {
    Controller,
    type ControllerProps,
    type FieldPath,
    type FieldValues,
    FormProvider,
    useFormContext,
} from 'react-hook-form';

import { cn } from '@/lib/utils';

import { Input } from './input';
import { Label } from './label';

const Form = FormProvider;

type FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    name: TName;
    noLabel?: boolean;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
    {} as FormFieldContextValue
);

const FormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    noLabel,
    ...props
}: ControllerProps<TFieldValues, TName> & { noLabel?: boolean }) => {
    return (
        <FormFieldContext.Provider value={{ name: props.name, noLabel }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    );
};

const useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext);
    const itemContext = React.useContext(FormItemContext);
    const { getFieldState, formState } = useFormContext();

    const fieldState = getFieldState(fieldContext.name, formState);

    if (!fieldContext) {
        throw new Error('useFormField should be used within <FormField>');
    }

    const { id } = itemContext;

    return {
        id,
        noLabel: fieldContext.noLabel,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState,
    };
};

type FormItemContextValue = {
    id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
    {} as FormItemContextValue
);

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        const id = React.useId();

        return (
            <FormItemContext.Provider value={{ id }}>
                <div ref={ref} className={cn('space-y-2', className)} {...props} />
            </FormItemContext.Provider>
        );
    }
);
FormItem.displayName = 'FormItem';

const FormLabel = React.forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
    const { error, formItemId, noLabel } = useFormField();

    if (noLabel) return null;

    return (
        <Label
            ref={ref}
            className={cn(error && 'text-destructive', className)}
            htmlFor={formItemId}
            id={formItemId}
            {...props}
        />
    );
});
FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef<
    React.ElementRef<typeof Slot>,
    React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId, noLabel } =
        useFormField();

    return (
        <Slot
            ref={ref}
            id={formItemId}
            aria-describedby={
                !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`
            }
            aria-invalid={!!error}
            aria-labelledby={noLabel ? undefined : formItemId}
            {...props}
        />
    );
});
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return (
        <p
            ref={ref}
            id={formDescriptionId}
            className={cn('text-sm text-muted-foreground', className)}
            {...props}
        />
    );
});
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;
    const t = useTranslations('auth');
    const message = body?.toString().includes('.') ? t(body) : undefined;

    // if ((!message && !body) || !body) {
    //     return null;
    // }

    return (
        <p
            ref={ref}
            id={formMessageId}
            className={cn('text-sm font-medium text-destructive', className)}
            {...props}
        >
            {message ? message : body}
            {!message && !body && <>&nbsp;</>}
        </p>
    );
});
FormMessage.displayName = 'FormMessage';

type FormTextInputProps = React.HTMLAttributes<HTMLInputElement> & {
    name: string;
    placeholder: string;
    disabled?: boolean;
    label?: boolean;
    noMessage?: boolean;
};

const FormTextInput = ({ name, label, noMessage, ...props }: FormTextInputProps) => {
    const type = name.toLowerCase().includes('password') ? 'password' : 'text';
    const isPassword = type === 'password';

    const form = useFormContext();

    return (
        <FormField
            control={form.control}
            noLabel={!label}
            name={name}
            render={({ field }) => (
                <FormItem className={cn(isPassword && 'relative')}>
                    <FormLabel>{name}</FormLabel>
                    <FormControl>
                        <Input {...props} type={type} {...field} />
                    </FormControl>
                    {!noMessage && <FormMessage />}
                </FormItem>
            )}
        />
    );
};

export {
    useFormField,
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormField,
    FormTextInput,
};
