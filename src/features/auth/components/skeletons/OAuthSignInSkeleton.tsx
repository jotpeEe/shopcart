import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { PROVIDERS } from '@/lib/constants';

const OAuthSignInSkeleton = () => (
    <div className="flex w-full gap-2 px-1.5">
        {PROVIDERS.map(p => (
            <Skeleton key={p} variant="button" />
        ))}
    </div>
);

export default OAuthSignInSkeleton;
