'use server';

import { type AuthResponse } from '@/types';

import { EmailSchema, type EmailSchemaType } from '../forms/schemas';
import { getUserByEmail } from '../utils/getUserByEmail';

export type ValidateEmailType = (values: EmailSchemaType) => AuthResponse;

export const validateEmail: ValidateEmailType = async values => {
  const validatedFields = EmailSchema.safeParse(values);

  const res = {
    ok: false,
    url: null,
    status: 400,
    error: null,
  };

  if (!validatedFields.success) {
    return { ...res, error: 'messages.email.invalid' };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    console.log('wrong');
    return { ...res, error: 'messages.email.notExist' };
  }

  return { ...res, ok: true, status: 200 };
};
