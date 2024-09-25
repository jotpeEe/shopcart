import { type MouseEvent } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';

import { useFormInputContext } from './form-input';
import { useFormField } from '../form';

const ResetButton = () => {
  const { value, name, toggleFocus } = useFormInputContext();
  const { resetField } = useFormContext();
  const { id: prefix, formInputId } = useFormField();

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    if (name) resetField(name);
    toggleFocus(e);
  };

  const active = value.length > 0;
  const id = `${prefix}-reset-button`;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={'input-reset-button'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <button
            className={cn('cursor-pointer p-2.5 text-stone-500 transition')}
            onClick={handleClick}
            id={id}
            aria-labelledby={formInputId}
            type="button"
            data-testid="reset-button"
          >
            <X className="size-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResetButton;
