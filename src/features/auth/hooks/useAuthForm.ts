import React, { useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type DefaultValues, type SubmitHandler, useForm } from 'react-hook-form';

import { toast } from '@/components/ui/use-toast';
import { type AuthResponse } from '@/types';

type SchemasType = Zod.AnyZodObject | Zod.ZodEffects<Zod.AnyZodObject>;

type HookFormOpts<S extends SchemasType> = {
  defaultValues: DefaultValues<Zod.TypeOf<S>> | undefined;
  schema: S;
  action?: (values: Zod.infer<S>) => AuthResponse;
  redirectUrl?: string;
  onSuccess?: () => void;
};

/**
 * Custom hook for handling authentication form submission and validation.
 *
 * @template S - The type of the schema used for form validation.
 * @param {Object} options - Options for the authentication form hook.
 * @param {Object} options.defaultValues - The default values for the form fields.
 * @param {import("zod").ZodSchema<S>} options.schema - The schema used for form validation.
 * @param {Function} options.action - The function to be called upon form submission.
 * @param {string} options.redirectUrl - The URL to redirect to upon successful form submission.
 * @param {Function} options.onSuccess - Optional callback function to be executed upon successful form submission.
 * @returns {Object} An object containing form related properties and functions.
 * @returns {import("react-hook-form").UseFormReturn<import("zod").ZodTypeAny>} form - The form object from React Hook Form library.
 * @returns {Function} handleSubmit - A function to handle form submission.
 * @returns {boolean} isSubmitting - A boolean indicating whether the form is currently submitting.
 *
 */
const useAuthForm = <S extends SchemasType>({
  defaultValues,
  schema,
  action,
  redirectUrl,
  onSuccess,
}: HookFormOpts<S>) => {
  const t = useTranslations('auth');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const router = useRouter();

  const form = useForm<Zod.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleUnknownError = useCallback(() => {
    toast({
      variant: 'destructive',
      title: t('messages.response.error'),
      description: t('messages.server.error'),
    });
  }, [t]);

  const onSubmit: SubmitHandler<Zod.infer<typeof schema>> = async values => {
    try {
      if (action) {
        setIsSubmitting(true);
        const res = await action(values);

        if (res?.ok) {
          if (onSuccess) onSuccess();
          if (redirectUrl) router.push(redirectUrl);
        }

        if (res?.error) {
          let isHandled = false;
          const { error } = res;

          const fields = Object.keys(values);

          fields.forEach((field: any) => {
            if (error.toLowerCase().includes(field.toLowerCase())) {
              isHandled = true;
              const message = t(error);

              form.setError(field, { message });
            }
          });

          if (!isHandled) handleUnknownError();
        }
      }
    } catch (error) {
      handleUnknownError();
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    isSubmitting,
  };
};

export default useAuthForm;
