import { ReactNode } from 'react';

import { signIn } from 'next-auth/react';
import { ImSpinner } from 'react-icons/im';

import { Button } from '@/components/ui';

type AuthSocialButtonProps = {
    children: ReactNode;
    type: 'google' | 'github';
    isLoading?: boolean;
};

export const AuthSocialButton = ({
    children,
    type,
    isLoading,
}: AuthSocialButtonProps) => {
    const handleClick = (type: AuthSocialButtonProps['type']) => {
        signIn(type, { callbackUrl: '/home' });
    };

    return (
        <Button
            className="w-full"
            variant="outline"
            type="button"
            onClick={() => handleClick(type)}
            disabled={isLoading}
        >
            {isLoading ? (
                <ImSpinner className="h-4 w-4 animate-spin" />
            ) : (
                children
            )}
        </Button>
    );
};
