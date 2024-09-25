import { forwardRef } from 'react';

import { Loader } from 'lucide-react';

import Send from '@/components/icons/Send';

import { useFormInputContext } from './form-input';
import { useFormField } from '../form';

const SubmitButton = forwardRef<HTMLButtonElement, { className?: string }>(
  ({ className }, ref) => {
    const { isLoading, value, handleSubmit, onClick } = useFormInputContext();
    const { id: prefix, formInputId } = useFormField();
    const isEmpty = value.length === 0;

    const id = `${prefix}-submit-button`;

    return (
      <div className={className}>
        {isLoading ? (
          <Loader className="z-30 mx-2 mt-3 h-4 animate-spin" />
        ) : (
          <button
            ref={ref}
            id={id}
            className="z-30 cursor-pointer p-2 text-black transition hover:text-stone-800 disabled:text-stone-300 dark:text-white hover:dark:text-white dark:disabled:text-stone-600"
            onClick={!!onClick ? onClick : handleSubmit}
            disabled={isEmpty}
            type={onClick ? 'button' : 'submit'}
            aria-labelledby={formInputId}
            data-testid="submit-button"
          >
            <Send className="h-6" />
          </button>
        )}
      </div>
    );
  }
);

SubmitButton.displayName = 'SubmitButton';

export default SubmitButton;
