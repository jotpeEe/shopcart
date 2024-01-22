import { PrismaAdapter } from '@auth/prisma-adapter';
import type { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import type { AuthOptions } from 'next-auth';
import { type Adapter } from 'next-auth/adapters';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { db } from './db';

export type Provider = 'github' | 'google';

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(db) as Adapter,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid provided credentials');
                }

                const user = await db.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!user || !user?.hashedPassword) {
                    throw new Error('There is no user with that email');
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if (!isCorrectPassword) {
                    throw new Error('Invalid Password');
                }

                return user;
            },
        }),
    ],
    pages: {
        signIn: '/auth',
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user);
            return token;
        },
        session: async ({ session, token }) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { hashedPassword, createdAt, updatedAt, ...user } = token.user as User;
            session.user = user;
            return session;
        },
    },
};
