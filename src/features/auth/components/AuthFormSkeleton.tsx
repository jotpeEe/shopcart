import { Fragment } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

const AuthFormSkeleton = () => (
    <div className="grid gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
            <Fragment key={`login-skeleton-${i}`}>
                {i !== 2 ? <Skeleton align="left" /> : <Skeleton bg="primary" />}
            </Fragment>
        ))}
    </div>
);

export default AuthFormSkeleton;
