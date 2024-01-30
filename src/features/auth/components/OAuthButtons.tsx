'use client';

import React from 'react';

import { Loader } from 'lucide-react';
import { signIn } from 'next-auth/react';

import { Github, Google } from '@/components/icons';
import { Button } from '@/components/ui';
import { type ProvidersType } from '@/lib/constants';
import { DEFAULT_REDIRECT } from '@/lib/constants';

type OAuthButtonGroupProps = {
    providers: ProvidersType;
};

const ProviderIcon = {
    github: <Github className="h-4 w-4" />,
    google: <Google className="h-4 w-4" />,
} as const;

export const OAuthButtonGroup: React.FC<OAuthButtonGroupProps> = ({ providers }) => {
    const [isLoading, setIsLoading] = React.useState(false);

    const handleClick = async (e: React.MouseEvent, provider: ProvidersType[number]) => {
        e.preventDefault();
        setIsLoading(true);

        await signIn(provider, { callbackUrl: DEFAULT_REDIRECT }).then(() =>
            setIsLoading(false)
        );
    };

    return (
        <div className="flex w-full gap-2">
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
                        ProviderIcon[provider]
                    )}
                </Button>
            ))}
        </div>
    );
};

export default OAuthButtonGroup;
