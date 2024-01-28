'use client';

import * as React from 'react';

import { Eye, EyeOff } from 'lucide-react';

import { cn } from '@/lib/utils';

const PasswordVisibilityToggle = ({
    ...props
}: React.HTMLAttributes<HTMLButtonElement>) => {
    const [clicked, setClicked] = React.useState<boolean>(false);

    return (
        <button
            className="absolute right-0 top-0 cursor-pointer p-2.5 text-stone-500 transition hover:text-stone-800 hover:dark:text-white"
            type="button"
            onClick={() => {
                setClicked(prevState => !prevState);
            }}
            {...props}
        >
            {clicked ? <EyeOff className="h-5 w-5 " /> : <Eye className="h-5 w-5" />}
        </button>
    );
};

const Input = React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement> & { type: 'password' | 'text' }
>(({ className, type, ...props }, ref) => {
    const isPassword = type === 'password';

    const inputRef = React.useRef<HTMLInputElement>(null);
    const [inputType, setInputType] = React.useState<'password' | 'text'>(type);

    ref = inputRef;

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setInputType(prev => (prev === 'text' ? 'password' : 'text'));

        const element = inputRef.current;
        element?.focus();
    };

    return (
        <div className="relative">
            <input
                ref={inputRef}
                type={inputType}
                className={cn(
                    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    type === 'password' && 'pr-10',
                    className
                )}
                {...props}
            />
            {isPassword && <PasswordVisibilityToggle onClick={handleClick} />}
        </div>
    );
});
Input.displayName = 'Input';

export { Input };
