import { NextResponse } from 'next/server';

import getCurrentUser from '@/lib/currentUser';
import { db } from '@/lib/db';

export async function PATCH(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const user = await getCurrentUser();

        const { bio, name, location } = await req.json();

        if (!user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const updatedUser = await db.user.update({
            where: {
                id: params.userId,
            },
            data: {
                bio,
                name,
                location,
            },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.log('[USER_ID_PATCH]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
