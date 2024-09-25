import React, { type HTMLAttributes } from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { type InputType, useFormField } from '../form';

type InputProps = HTMLAttributes<HTMLInputElement> & {
  name: string;
  buttons: 1 | 2 | 3;
  placeholder?: string;
  align?: 'top' | 'bottom' | 'mid' | 'default' | undefined;
  disabled?: boolean;
  type?: InputType;
};

const inputVariants = cva(
  'flex h-10 w-full relative border border-input focus-visible:z-20 bg-background py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      buttons: {
        1: 'pl-3 pr-10',
        2: 'pl-3 pr-20',
        3: 'pl-3 pr-[120px]',
      },
      align: {
        top: 'rounded-t-md',
        bottom: 'rounded-b-md',
        mid: '',
        default: 'rounded-md focus-visible:ring-offset-2',
      },
    },
    defaultVariants: {
      buttons: 1,
      align: 'default',
    },
  }
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, buttons, align, className, ...props }, ref) => {
    const { formInputId } = useFormField();

    return (
      <input
        ref={ref}
        className={cn(inputVariants({ buttons, align, className }))}
        {...props}
        type={type}
        id={formInputId}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
