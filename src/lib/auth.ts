import { PrismaAdapter } from '@auth/prisma-adapter';
import { type User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { type AuthOptions, type DefaultSession, getServerSession } from 'next-auth';
import { type Adapter } from 'next-auth/adapters';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import env from '@/env.js';

import { db } from './db';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: Omit<User, 'hashedPassword' | 'createdAt' | 'updatedAt'> &
      DefaultSession['user'];
  }
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
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

        const { email, password } = credentials;

        const user = await db.user.findUnique({
          where: {
            email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error('messages.email.notExist');
        }

        const isCorrectPassword = await bcrypt.compare(password, user.hashedPassword);

        if (!isCorrectPassword) {
          throw new Error('messages.password.invalid');
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/auth',
  },
  debug: env.ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: ({ session, token }) => {
      const { hashedPassword, createdAt, updatedAt, ...user } = token.user as User;
      session.user = user;
      return session;
    },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
