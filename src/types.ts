import { type SignInResponse } from 'next-auth/react';

export type AuthResponse = Promise<SignInResponse | undefined>;

export type AuthServerAction = (
  state: SignInResponse | undefined,
  payload: FormData
) => SignInResponse | Promise<SignInResponse | undefined> | undefined;

export type AlertState = {
  state: 'error' | 'warning' | 'off';
  message?: string;
};
