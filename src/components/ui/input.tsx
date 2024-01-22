import * as React from 'react';

import { Eye, EyeOff } from 'lucide-react';

import { cn } from '@/lib/utils';

const PasswordVisibilityToggle = ({
    onClick,
    ...props
}: React.HTMLAttributes<HTMLButtonElement>) => {
    const [clicked, setClicked] = React.useState<boolean>(false);

    return (
        <button
            type="button"
            onClick={e => {
                setClicked(c => !c);
                if (onClick) onClick(e);
            }}
            className="absolute right-0 top-0 cursor-pointer p-2.5 text-stone-500 transition hover:text-stone-800 hover:dark:text-white"
            {...props}
        >
            {clicked ? <EyeOff className="h-5 w-5 " /> : <Eye className="h-5 w-5" />}
        </button>
    );
};

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    eye?: boolean;
    handleClick?: React.MouseEventHandler;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, handleClick, eye, ...props }, ref) => {
        return (
            <div className="relative">
                <input
                    type={type}
                    className={cn(
                        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                        type === 'password' && 'pr-10',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {eye && (
                    <PasswordVisibilityToggle
                        onClick={e => {
                            if (handleClick) handleClick(e);
                        }}
                    />
                )}
            </div>
        );
    }
);
Input.displayName = 'Input';

export { Input };
