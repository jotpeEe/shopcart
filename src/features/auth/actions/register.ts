'use server';

import bcrypt from 'bcrypt';
import { getTranslations } from 'next-intl/server';

import { db } from '@/lib/db';
import { RegisterSchema, type RegisterSchemaType } from '@/schemas';

import { getUserByEmail } from '../services/getUserByEmail';

export type RegisterType = (
    values: RegisterSchemaType
) => Promise<{ success: string } | { error: string }>;

export const register: RegisterType = async (values: RegisterSchemaType) => {
    const t = await getTranslations('auth.messages');
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: t('server.invalid') };
    }

    const { email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: t('email.alreadyExist') };
    }

    await db.user.create({
        data: {
            email,
            hashedPassword,
        },
    });

    return { success: t('server.signedIn') };
};
