'use client';

import { type SignInResponse, signIn } from 'next-auth/react';

import { type LoginSchemaType } from '../forms/schemas';

export type LoginType = (values: LoginSchemaType) => Promise<SignInResponse | undefined>;

export const login = async (values: LoginSchemaType) => {
    try {
        // signIn function doesn't work on a server
        const callback = await signIn('credentials', {
            ...values,
            redirect: false,
        });

        return callback;
    } catch (error) {
        console.log(error);
    }
};
