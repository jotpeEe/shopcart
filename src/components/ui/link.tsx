import { default as NextLink } from 'next/link';

import Logo from '@/components/icons/Logo';
import { cn } from '@/lib/utils';

type LinkProps = {
    children?: React.ReactNode;
    href?: string;
    className?: string;
    external?: boolean;
    home?: boolean;
};

export const Link: React.FC<LinkProps> = ({
    href,
    children,
    className,
    external = false,
    home = false,
}) => (
    <>
        {external ? (
            <a
                className={className}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
            >
                {children}
            </a>
        ) : (
            <NextLink
                className={cn(home && 'mr-4 lg:mr-6 ', className)}
                href={href || '/'}
            >
                <>
                    {home && (
                        <div className="flex items-center">
                            <Logo className="h-6 w-6" />
                            <span className="px-2 py-1.5 text-sm font-semibold">
                                shopcart
                            </span>
                        </div>
                    )}
                    {children}
                </>
            </NextLink>
        )}
    </>
);
