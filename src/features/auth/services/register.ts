'use server';

import bcrypt from 'bcrypt';
import { type SignInResponse } from 'next-auth/react';

import { db } from '@/lib/db';

import { RegisterSchema, type RegisterSchemaType } from '../forms/schemas';
import { getUserByEmail } from '../utils/getUserByEmail';

export type RegisterType = (
    values: RegisterSchemaType
) => Promise<SignInResponse | undefined>;

export const register = async (
    values: RegisterSchemaType
): Promise<SignInResponse | undefined> => {
    const validatedFields = RegisterSchema.safeParse(values);

    const res = {
        ok: false,
        status: 400,
        error: null,
        url: null,
    };

    if (!validatedFields.success) {
        return { ...res, error: 'messages.server.invalid' };
    }

    const { email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { ...res, error: 'messages.email.alreadyExist' };
    }

    await db.user.create({
        data: {
            email,
            hashedPassword,
        },
    });

    return { ...res, ok: true, status: 200 };
};
