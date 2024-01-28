'use client';

import React from 'react';

import { Loader } from 'lucide-react';
import { signIn } from 'next-auth/react';

import { Github, Google } from '@/components/icons';
import { Button } from '@/components/ui';
import { type Provider } from '@/lib/auth';
import { DEFAULT_REDIRECT } from '@/lib/constants';

type AuthSocialsProps = {
    providers: Provider[];
};

const SocialIcon = {
    github: <Github className="h-4 w-4" />,
    google: <Google className="h-4 w-4" />,
} as const;

export const AuthSocials: React.FC<AuthSocialsProps> = ({ providers }) => {
    const [isLoading, setIsLoading] = React.useState(false);

    const handleClick = async (e: React.MouseEvent, provider: Provider[number]) => {
        e.preventDefault();
        setIsLoading(true);

        await signIn(provider, { callbackUrl: DEFAULT_REDIRECT }).then(() =>
            setIsLoading(false)
        );
    };

    return (
        <>
            {providers.map((provider, index) => (
                <Button
                    key={`${index}-button-social`}
                    className="w-full"
                    disabled={isLoading}
                    onClick={e => handleClick(e, provider)}
                    type="button"
                    variant="outline"
                >
                    {isLoading ? (
                        <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                        SocialIcon[provider]
                    )}
                </Button>
            ))}
        </>
    );
};

export default AuthSocials;
