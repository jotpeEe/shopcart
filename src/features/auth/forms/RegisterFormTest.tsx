import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

import { Form, type InputType } from '@/components/ui/form';
import { FormInput } from '@/components/ui/input/form-input';
import { cn } from '@/lib/utils';
import { type AlertState, type AuthResponse } from '@/types';

import { RegisterSchema, type RegisterSchemaType } from './schemas';
import { ErrorBanner, WarnBanner } from '../components/banners';

type Step = 'email' | 'password' | 'passwordConfirm';

type RegisterFormTestProps = {
  register: (values: RegisterSchemaType) => AuthResponse;
  disabled: boolean;
};

type RegisterState = {
  alert: AlertState;
  isSubmitting: boolean;
  step: Step;
  password: InputType;
};

type RegisterAction = {
  type:
    | 'validate_email'
    | 'validate_password'
    | 'validate_passwordConfirm'
    | 'reset'
    | 'reset_password'
    | 'toggle_password_visibility';
  message?: string;
  step?: Step;
};

const initialState: RegisterState = {
  alert: {
    state: 'off',
  },
  isSubmitting: false,
  step: 'email',
  password: 'password',
};

const registerReducer = (state: RegisterState, action: RegisterAction): RegisterState => {
  switch (action.type) {
    case 'validate_email': {
      return {
        ...state,
        step: 'password',
      };
    }
    case 'validate_password': {
      return {
        ...state,
        step: 'passwordConfirm',
      };
    }
    case 'toggle_password_visibility': {
      return {
        ...state,
        password: state.password === 'text' ? 'password' : 'text',
      };
    }
    case 'reset': {
      return {
        ...initialState,
      };
    }
    case 'reset_password': {
      return {
        ...initialState,
        step: 'password',
        password: state.password,
      };
    }
    default:
      return state;
  }
};

const AlertVariants = {
  warning: WarnBanner,
  error: ErrorBanner,
  off: null,
};

const RegisterFormTest = ({ register, disabled }: RegisterFormTestProps) => {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const [{ step, isSubmitting, alert, password: type }, dispatch] = React.useReducer(
    registerReducer,
    initialState
  );

  const Alert = React.useMemo(() => AlertVariants[alert.state], [alert.state]);

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const { trigger, watch, setValue, resetField } = form;

  const validate = React.useCallback(
    (input: Step): React.MouseEventHandler | undefined => {
      if (input !== step) return;

      return async e => {
        e.preventDefault();
        const isValid = await trigger(step);

        if (isValid) {
          dispatch({ type: `validate_${step}` });
        }
      };
    },
    [trigger, step]
  );

  const togglePassword = React.useCallback(
    (input: Step): React.MouseEventHandler | undefined => {
      if (input !== step) return;

      return e => {
        e.preventDefault();
        dispatch({ type: 'toggle_password_visibility' });
      };
    },
    [step]
  );

  const email = watch('email');
  const password = watch('password');

  React.useEffect(() => {
    dispatch({ type: 'reset' });
    setValue('password', '');
    setValue('passwordConfirm', '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  React.useEffect(() => {
    dispatch({ type: 'reset_password' });
    resetField('passwordConfirm');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  return (
    <div className={cn('relative mx-1.5 my-2 h-auth', disabled && 'hidden')}>
      <Form {...form}>
        <form
          onSubmit={() => {
            console.log('submit');
          }}
        >
          <FormInput
            ref={emailRef}
            name="email"
            align="top"
            onClick={validate('email')}
            isLoading={isSubmitting}
          />
          <AnimatePresence>
            {step !== 'email' && (
              <motion.div
                className="absolute left-0 right-0 top-10"
                key={'password-input'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="relative">
                  <FormInput
                    ref={passwordRef}
                    name="password"
                    align="mid"
                    onClick={validate('password')}
                    togglePassword={togglePassword('password')}
                    type={type}
                    isLoading={isSubmitting}
                  />
                  <AnimatePresence>
                    {step === 'passwordConfirm' && (
                      <motion.div
                        className="absolute left-0 right-0 top-10"
                        key={'passwordConfirm-input'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <FormInput
                          ref={passwordRef}
                          name="passwordConfirm"
                          placeholder="Repeat password"
                          onClick={validate('passwordConfirm')}
                          togglePassword={togglePassword('passwordConfirm')}
                          type={type}
                          align="bottom"
                          isLoading={isSubmitting}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
            {Alert && (
              <motion.div
                className="absolute inset-0 mt-12"
                key={'login-alert'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Alert>{alert.message}</Alert>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </Form>
    </div>
  );
};
export default RegisterFormTest;
