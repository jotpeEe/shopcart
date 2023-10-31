import { useContext } from 'react';

import { NavbarContext } from '@/contexts';

const useNavbar = () => {
    const context = useContext(NavbarContext);

    if (!context) {
        throw new Error('useNavbar must be used within a Navbar');
    }
    return context;
};

export default useNavbar;
