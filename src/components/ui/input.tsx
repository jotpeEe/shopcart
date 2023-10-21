import * as React from 'react';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { cn } from '@/lib/utils';

const Eye = ({
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
            {clicked ? (
                <AiOutlineEyeInvisible className="h-5 w-5 " />
            ) : (
                <AiOutlineEye className="h-5 w-5"></AiOutlineEye>
            )}
        </button>
    );
};

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
                {eye && <Eye onClick={e => handleClick(e)} />}
            </>
        );
    }
);
Input.displayName = 'Input';

export { Input };
