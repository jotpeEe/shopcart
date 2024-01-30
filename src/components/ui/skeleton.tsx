import { type VariantProps, cva } from 'class-variance-authority';
import { Loader } from 'lucide-react';

import { cn } from '@/lib/utils';

const skeletonVariants = cva('flex items-center rounded-md', {
    variants: {
        variant: {
            input: 'border border-input',
            button: '',
        },
        size: {
            default: 'h-10 px-3 py-2 w-full',
            sm: 'h-6 px-3.5 py-1.5 text-xs f-fit',
            square: 'h-6 py-1 px-0.5 w-fit',
        },
        align: {
            center: 'justify-center',
            left: 'justify-start',
            right: 'justify-end',
        },
        bg: {
            default: 'bg-background',
            primary: 'bg-primary text-primary-foreground',
            stone: 'bg-stone-700 text-white/70',
        },
    },
    defaultVariants: {
        variant: 'input',
        size: 'default',
        align: 'center',
        bg: 'default',
    },
});

export const Skeleton = ({
    variant,
    size,
    align,
    bg,
}: VariantProps<typeof skeletonVariants>) => (
    <div className={cn(skeletonVariants({ variant, size, align, bg }))}>
        <Loader className={cn('animate-spin', size === 'default' ? 'h-4' : 'h-3')} />
    </div>
);
