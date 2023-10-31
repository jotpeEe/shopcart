import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export default async function getCurrentUser() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await db.user.findUnique({
            where: {
                email: session.user.email as string,
            },
        });

        if (!currentUser) {
            return null;
        }

        const { hashedPassword, emailVerified, updatedAt, createdAt, ...user } =
            currentUser;

        return {
            ...user,
        };
    } catch (error: any) {
        console.log(error);
        return null;
    }
}
