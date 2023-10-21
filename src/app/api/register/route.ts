import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        const existingUser = await db.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            return new NextResponse('Email Taken', { status: 422 });
        }

        if (!email || !password) {
            return new NextResponse('Missing credentials', { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await db.user.create({
            data: {
                email,
                hashedPassword,
                image: '',
                emailVerified: new Date(),
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.log('[REGISTRATION_ERROR]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
