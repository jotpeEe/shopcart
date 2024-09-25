import React, { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type SubmitHandler, useForm } from 'react-hook-form';

import Send from '@/components/icons/Send';
import { useCarousel } from '@/components/ui/carousel';
import { Form } from '@/components/ui/form';
import { FormInput } from '@/components/ui/input/form-input';
import { DEFAULT_REDIRECT } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { type AlertState, type AuthResponse } from '@/types';

import { type EmailSchemaType, LoginSchema, type LoginSchemaType } from './schemas';
import { ErrorBanner, WarnBanner } from '../components/banners';
import { type ValidateEmailType } from '../services/validateEmail';

type LoginFormTestProps = {
  validateEmail: ValidateEmailType;
  submit: (values: LoginSchemaType) => AuthResponse;
  disabled: boolean;
};

type LoginState = {
  alert: AlertState;
  isSubmitting: boolean;
  step: 'email' | 'password';
};

type HandleActionProps<S> = {
  action: (values: S) => AuthResponse;
  values: S;
};

type LoginAction = {
  type:
    | 'VALIDATE_EMAIL_SUCCESS'
    | 'ERROR_EMAIL'
    | 'ERROR_UNKNOWN'
    | 'SUBMITTING'
    | 'SUBMITTING_ENDS'
    | 'RESET';
  message?: string;
};

const initialState: LoginState = {
  alert: {
    state: 'off',
  },
  isSubmitting: false,
  step: 'email',
};

const loginReducer = (state: LoginState, action: LoginAction): LoginState => {
  switch (action.type) {
    case 'RESET': {
      return {
        ...initialState,
      };
    }
    case 'SUBMITTING':
      return {
        ...state,
        isSubmitting: true,
      };
    case 'SUBMITTING_ENDS':
      return {
        ...state,
        isSubmitting: false,
      };
    case 'VALIDATE_EMAIL_SUCCESS':
      return {
        ...state,
        step: 'password',
      };
    case 'ERROR_EMAIL':
      return {
        ...state,
        alert: {
          state: 'warning',
          message: action.message,
        },
      };
    case 'ERROR_UNKNOWN':
      return {
        ...state,
        alert: {
          state: 'error',
          message: action.message,
        },
      };
    default:
      return state;
  }
};

const LoginFormTest = ({ validateEmail, submit, disabled }: LoginFormTestProps) => {
  const inputEmailRef = React.useRef<HTMLInputElement>(null);
  const inputPasswordRef = React.useRef<HTMLInputElement>(null);

  const [{ alert, isSubmitting, step }, dispatch] = React.useReducer(
    loginReducer,
    initialState
  );

  const router = useRouter();
  const t = useTranslations('auth');
  const { api } = useCarousel();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { trigger, getValues, watch, setError, handleSubmit } = form;

  const handleAction = React.useCallback(
    async <S extends Record<string, string>>({
      action,
      values,
    }: HandleActionProps<S>) => {
      let message = t('messages.server.error');
      const isEmail = step === 'email';

      try {
        if (action) {
          dispatch({ type: 'SUBMITTING' });
          const res = await action(values);

          if (res?.ok) {
            if (!isEmail) {
              router.push(DEFAULT_REDIRECT);
            } else {
              dispatch({ type: 'VALIDATE_EMAIL_SUCCESS' });
            }
          }

          if (res?.error) {
            let isHandled = false;
            const { error } = res;

            const fields = Object.keys(values);

            fields.forEach((field: any) => {
              if (error.toLowerCase().includes(`${field.toLowerCase()}.`)) {
                isHandled = true;
                message = t(error);

                if (isEmail) {
                  dispatch({ type: 'ERROR_EMAIL', message });
                } else {
                  setError(field, { message });
                }
              }
            });

            if (!isHandled) dispatch({ type: 'ERROR_UNKNOWN', message });
            if (!isEmail) dispatch({ type: 'SUBMITTING_ENDS' });
          }
        }
      } catch (error) {
        dispatch({ type: 'ERROR_UNKNOWN', message });
      } finally {
        if (isEmail) dispatch({ type: 'SUBMITTING_ENDS' });
      }
    },
    [router, setError, step, t]
  );

  const handleValidateEmail = React.useCallback(async () => {
    const isValid = await trigger('email');

    if (isValid) {
      const email = getValues('email');
      const values = { email };
      await handleAction<EmailSchemaType>({ action: validateEmail, values });
    }
  }, [getValues, trigger, validateEmail, handleAction]);

  const onSubmit: SubmitHandler<LoginSchemaType> = React.useCallback(
    async values => {
      await handleAction<LoginSchemaType>({ action: submit, values });
    },
    [handleAction, submit]
  );

  const goToSingUp = () => {
    api?.scrollNext();
  };

  const email = watch('email');

  useEffect(() => {
    dispatch({ type: 'RESET' });
  }, [email]);

  useEffect(() => {
    if (!isSubmitting) {
      if (step === 'email') {
        inputEmailRef.current?.focus();
      } else {
        inputPasswordRef.current?.focus();
      }
    }
  }, [isSubmitting, step]);

  return (
    <div className={cn('relative m-1.5 h-[108px]', disabled && 'hidden')}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            ref={inputEmailRef}
            name="email"
            align="top"
            onClick={step === 'email' ? handleValidateEmail : undefined}
            isLoading={isSubmitting}
          />
          <AnimatePresence>
            {step === 'password' && (
              <motion.div
                className="absolute bottom-0 left-0 right-0"
                key={'password-form'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <FormInput
                  ref={inputPasswordRef}
                  name="password"
                  align="bottom"
                  handleSubmit={handleSubmit(onSubmit)}
                  isLoading={isSubmitting}
                />
              </motion.div>
            )}
            {alert.state !== 'off' && (
              <motion.div
                className="mt-12"
                key={'login-alert'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {alert.state === 'warning' ? (
                  <WarnBanner>
                    <div className="flex w-full items-center justify-between gap-2">
                      {alert.message}
                      <button
                        className="cursor-pointer p-2 text-black transition hover:text-stone-800 disabled:text-stone-300 dark:text-white hover:dark:text-white dark:disabled:text-stone-600"
                        onClick={goToSingUp}
                      >
                        <Send className="h-6 text-[#FFD55D]" />
                      </button>
                    </div>
                  </WarnBanner>
                ) : (
                  <ErrorBanner>{alert.message}</ErrorBanner>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </Form>
    </div>
  );
};

export default LoginFormTest;
