'use client';

import React from 'react';

import { signOut } from 'next-auth/react';

import { Button } from '@/components/ui/button';

const HomePage = () => {
    const handleLogout = () => {
        signOut({ callbackUrl: 'http://localhost:3000/auth' });
    };

    return (
        <>
            <div>Home</div>
            <Button onClick={handleLogout}>Log out</Button>
        </>
    );
};

export default HomePage;
