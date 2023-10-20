'use client';

import { signOut } from 'next-auth/react';

import { Button } from '@/components/ui';

export const SignOut = () => {
    return (
        <Button
            className="w-fit dark:text-black"
            onClick={() =>
                signOut({
                    redirect: true,
                    callbackUrl: 'http://localhost:3000/auth',
                })
            }
        >
            Logout
        </Button>
    );
};
