'use client';

import React from 'react';

import { Loader } from 'lucide-react';
import { signIn } from 'next-auth/react';

import Github from '@/components/icons/Github';
import Google from '@/components/icons/Google';
import { Button } from '@/components/ui/button';
import { DEFAULT_REDIRECT, type ProvidersType } from '@/lib/constants';
import { capFirst } from '@/utils/capFirst';

type OAuthSignInProps = {
  providers: ProvidersType;
};

const ProviderIcon = {
  github: <Github className="h-4 w-4" />,
  google: <Google className="h-4 w-4" />,
} as const;

export const OAuthSignIn: React.FC<OAuthSignInProps> = ({ providers }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClick = async (e: React.MouseEvent, provider: ProvidersType[number]) => {
    e.preventDefault();
    setIsLoading(true);

    await signIn(provider, { callbackUrl: DEFAULT_REDIRECT }).then(() =>
      setIsLoading(false)
    );
  };

  return (
    <div className="flex w-full flex-col gap-2 px-1.5">
      {providers.map((provider, index) => (
        <Button
          key={`${index}-button-social`}
          className="w-full"
          disabled={isLoading}
          onClick={e => handleClick(e, provider)}
          type="button"
          variant="oauth"
          title={`${provider}-social-button`}
        >
          {isLoading ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            ProviderIcon[provider]
          )}
          {capFirst(provider)}
        </Button>
      ))}
    </div>
  );
};

export default OAuthSignIn;
