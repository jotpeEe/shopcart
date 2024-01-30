import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { PROVIDERS } from '@/lib/constants';

const OAuthButtonSkeleton = () => (
    <div className="flex w-full gap-2">
        {PROVIDERS.map(p => (
            <Skeleton key={p} />
        ))}
    </div>
);

export default OAuthButtonSkeleton;
