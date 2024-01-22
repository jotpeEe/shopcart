'use server';

import bcrypt from 'bcrypt';
import { getTranslations } from 'next-intl/server';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/lib/utils';
import { RegisterSchema, type RegisterSchemaType } from '@/schemas';

export const register = async (
    values: RegisterSchemaType
): Promise<{ [key: string]: string }> => {
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
