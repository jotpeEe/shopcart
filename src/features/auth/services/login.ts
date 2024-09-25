'use client';

import { signIn } from 'next-auth/react';

import { type AuthResponse } from '@/types';

import { type LoginSchemaType } from '../forms/schemas';

export type LoginType = (values: LoginSchemaType) => AuthResponse;

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
