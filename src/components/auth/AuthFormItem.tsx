import { MouseEvent, useRef, useState } from 'react';

import { useFormContext } from 'react-hook-form';

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
} from '@/components/ui';
import { capitalizeFirstLetter } from '@/lib/capitalizeFirstLetter';
import { cn } from '@/lib/utils';

type AuthFormItemProps = {
    name: string;
    placeholder: string;
    disabled?: boolean;
    componentName?: 'useLogin' | 'useSignup';
    type?: HTMLInputElement['type'];
};

export const AuthFormitem = ({
    type = 'text',
    name,
    componentName,
    ...props
}: AuthFormItemProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [inputType, setInputType] = useState<AuthFormItemProps['type']>(type);
    const form = useFormContext();

    const handleInputClick = (e: MouseEvent) => {
        e.preventDefault();

        setInputType(inputType === 'password' ? 'text' : 'password');

        const element = inputRef.current;

        element?.focus();
    };

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field: { ref, ...field } }) => (
                <FormItem className={cn(type === 'password' && 'relative')}>
                    <FormLabel className="sr-only">
                        {capitalizeFirstLetter(field.name)}
                    </FormLabel>
                    <FormControl>
                        <Input
                            ref={e => {
                                ref(e);
                                inputRef.current = e;
                            }}
                            handleClick={handleInputClick}
                            type={inputType}
                            eye={name.includes('password')}
                            {...props}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage component={componentName} />
                </FormItem>
            )}
        />
    );
};
