'use client';

import { signOut } from 'next-auth/react';

import { Button } from '@/components/ui';

export const SignOut = () => {
    return (
        <Button
            className="w-fit dark:text-black"
            onClick={() =>
                signOut({
                    callbackUrl: '/auth',
                })
            }
        >
            Logout
        </Button>
    );
};
