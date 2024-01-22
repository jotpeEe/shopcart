import { type User as UserType } from '@prisma/client';
import { type DefaultUser } from 'next-auth';

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: DefaultUser & Omit<UserType, 'hashedPassword' | 'createdAt' | 'updatedAt'>;
    }

    interface User extends UserType {
        id: string;
    }
}
