import { type FC, type HTMLAttributes } from 'react';
import React from 'react';

import { Eye, EyeOff } from 'lucide-react';

import { cn } from '@/lib/utils';

import { useFormInputContext } from './form-input';
import { useFormField } from '../form';

const PasswordVisibilityButton: FC<HTMLAttributes<HTMLButtonElement>> = ({
  ...props
}) => {
  const { value, togglePassword, toggleFocus, type } = useFormInputContext();
  const { id: prefix, formInputId } = useFormField();

  const isEmpty = value.length === 0;
  const id = `${prefix}-password-visibility-button`;

  return (
    <button
      className={cn(
        'z-30 cursor-pointer p-2.5 text-stone-500 transition hover:text-stone-800 hover:dark:text-white',
        !isEmpty && 'text-black dark:text-white'
      )}
      type="button"
      id={id}
      aria-labelledby={formInputId}
      onClick={e => {
        if (togglePassword) togglePassword(e);
        toggleFocus(e);
      }}
      data-testid="password-toggle-button"
      {...props}
    >
      {type === 'text' ? <EyeOff className="h-5 w-5 " /> : <Eye className="h-5 w-5" />}
    </button>
  );
};

export default PasswordVisibilityButton;
