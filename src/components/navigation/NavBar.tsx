'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';

import { NavbarContext } from '@/contexts';
import { useNavLinks } from '@/hooks';

import { MainNav } from './MainNav';
import { ModeToggle } from '..';

const UserNav = dynamic(() => import('../../components/navigation/UserNav'));

export const NavBar = () => {
    const { links, indexActive } = useNavLinks();
    const [active, setActive] = useState<(typeof links)[number]['title']>(
        links[indexActive]?.title
    );

    const handleRouteChange = (title: string) => {
        setActive(title);
    };

    const context = {
        active,
        handleRouteChange,
    };

    return (
        <div className="border-b">
            <div className="mx-auto flex h-14 max-w-7xl items-center px-4">
                <NavbarContext.Provider value={context}>
                    <MainNav />
                    <div className="ml-auto flex items-center space-x-4">
                        <ModeToggle />
                        <UserNav />
                    </div>
                </NavbarContext.Provider>
            </div>
        </div>
    );
};
