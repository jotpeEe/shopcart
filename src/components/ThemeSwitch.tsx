'use client';

import { useEffect, useState } from 'react';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui';

const Icon = {
    dark: <SunIcon className="h-3 w-3 " />,
    light: <MoonIcon className="h-3 w-3 " />,
};

const ThemeSwitch = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <Button
            className="h-6 px-2 py-2.5"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            variant="outline"
        >
            {Icon[theme as 'dark' | 'light']}
        </Button>
    );
};

export default ThemeSwitch;
