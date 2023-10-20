import { ReactNode } from 'react';

import { CircleDot } from 'lucide-react';

import { Button } from '@/components/ui';

export const AuthSocialButton = ({
    children,
    isLoading,
}: {
    children: ReactNode;
    isLoading?: boolean;
}) => {
    return (
        <Button
            className="w-full"
            variant="outline"
            type="button"
            disabled={isLoading}
        >
            {isLoading ? (
                <CircleDot className="h-4 w-4 animate-spin" />
            ) : (
                children
            )}
        </Button>
    );
};
