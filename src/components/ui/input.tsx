import * as React from 'react';

import { Eye } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    eye?: boolean;
    handleClick: React.MouseEventHandler;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, handleClick, eye, ...props }, ref) => {
        return (
            <>
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
                    <button
                        type="button"
                        onClick={e => handleClick(e)}
                        className="absolute right-0 top-0 cursor-pointer p-2.5 text-stone-500 transition hover:text-stone-800 hover:dark:text-white"
                    >
                        <Eye className="h-5 w-5 " />
                    </button>
                )}
            </>
        );
    }
);
Input.displayName = 'Input';

export { Input };
