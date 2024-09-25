import React, {
  type KeyboardEventHandler,
  type MouseEvent,
  type MouseEventHandler,
  createContext,
  forwardRef,
  useCallback,
  useContext,
} from 'react';

import { useFormContext } from 'react-hook-form';

import { capFirst } from '@/utils/capFirst';

import Input from './input';
import PasswordVisibilityButton from './password-visibility-button';
import ResetButton from './reset-button';
import SubmitButton from './submit-button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  type InputType,
} from '../form';

type FormInputProps = {
  name: string; //
  placeholder?: string;
  align?: 'top' | 'bottom' | 'mid' | 'default' | undefined;
  disabled?: boolean;
  handleSubmit?: () => {}; //
  onClick?: MouseEventHandler; //
  togglePassword?: MouseEventHandler; //
  isLoading?: boolean; //
  isSubmittedSuccessful?: boolean; //
  label?: string;
  type?: InputType;
};

type FormInputContextType = Omit<
  FormInputProps,
  'placeholder' | 'align' | 'disabled' | 'label'
> & {
  toggleFocus: MouseEventHandler;
  value: string;
};

const FormTextInputContext = createContext<FormInputContextType | null>(null);

const useFormInputContext = () => {
  const context = useContext(FormTextInputContext);

  if (!context) {
    throw new Error('useFormInputContext must be used within a <FormInput />');
  }

  return context;
};

const FormInput = forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const submitButtonRef = React.useRef<HTMLButtonElement>(null);

  const {
    disabled,
    handleSubmit,
    togglePassword,
    placeholder,
    onClick,
    isLoading,
    isSubmittedSuccessful,
    label,
    name,
    type,
    ...rest
  } = props;

  const inputType: InputType = name?.toLowerCase().includes('password')
    ? 'password'
    : 'text';

  const isPassword = inputType === 'password';

  const buttonActive = !!handleSubmit || !!onClick;

  const form = useFormContext();

  const toggleFocus = useCallback((e: MouseEvent) => {
    e.preventDefault();
    inputRef?.current?.focus();
  }, []);

  React.useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(inputRef.current);
      } else {
        ref.current = inputRef.current;
      }
    }
  }, [ref]);

  const handlePressEnter: KeyboardEventHandler = React.useCallback(
    e => {
      if (e.key === 'Enter' && !handleSubmit && onClick) {
        e.preventDefault();
        submitButtonRef.current?.click();
      }
    },
    [onClick, handleSubmit, submitButtonRef]
  );

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormTextInputContext.Provider
          value={{
            name,
            value: field.value,
            togglePassword,
            toggleFocus,
            handleSubmit,
            onClick,
            isLoading,
            isSubmittedSuccessful,
            type,
          }}
        >
          <FormItem className="h-[68px]">
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <div className="relative">
                <Input
                  {...field}
                  ref={inputRef}
                  onKeyDown={handlePressEnter}
                  disabled={disabled || isLoading}
                  type={type}
                  buttons={isPassword ? 3 : 2}
                  placeholder={placeholder || capFirst(name)}
                  {...rest}
                />
                <div className="absolute right-0 top-0 z-30 flex">
                  {isPassword ? (
                    <>
                      <ResetButton />
                      {togglePassword && <PasswordVisibilityButton />}
                      {buttonActive && <SubmitButton ref={submitButtonRef} />}
                    </>
                  ) : (
                    <>
                      <ResetButton />
                      {buttonActive && <SubmitButton ref={submitButtonRef} />}
                    </>
                  )}
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormTextInputContext.Provider>
      )}
    />
  );
});

FormInput.displayName = 'FormMessage';

export { useFormInputContext, FormInput };
