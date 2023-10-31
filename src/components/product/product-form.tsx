'use client';

import { FormEvent, useState } from 'react';

import { CiRuler } from 'react-icons/ci';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { PiEnvelopeSimpleThin } from 'react-icons/pi';

import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'] as const;

const Dot = () => <div className="h-2 w-2 rounded-full bg-red-600" />;

const ProductForm = () => {
    const [active, setActive] = useState<(typeof sizes)[number]>('L');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(active);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                    <span>Sizes</span>
                    <div className="flex items-center justify-center gap-2">
                        <Dot />
                        <span>Few pieces left</span>
                    </div>
                </div>
                <ul className="grid grid-cols-5 gap-2 text-xs">
                    {sizes.map((size, idx) => (
                        <li key={size}>
                            <label
                                htmlFor={size}
                                className={cn(
                                    'flex h-10 w-full cursor-pointer items-center justify-center gap-1 border border-gray-300 font-semibold leading-3',
                                    active === size &&
                                        'bg-black text-white dark:bg-white dark:text-black'
                                )}
                            >
                                {idx === sizes.length - 1 && <Dot />}
                                <input
                                    id={size}
                                    onChange={() => setActive(size)}
                                    name="sizeLabel"
                                    className="hidden"
                                    type="radio"
                                />
                                {size}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex justify-between">
                <div className="flex items-end justify-center gap-2">
                    <div className="rotate-[270deg]">
                        <CiRuler />
                    </div>
                    <button className="text-xs font-medium leading-3 underline">
                        Size guide
                    </button>
                </div>
                <div className="flex items-end justify-center gap-2">
                    <PiEnvelopeSimpleThin />
                    <button className="text-xs font-medium leading-3 underline">
                        Size out of stock?
                    </button>
                </div>
            </div>
            <Button className="w-full gap-1 rounded-none text-base font-semibold">
                <span>
                    <HiOutlineShoppingBag />
                </span>
                Add
            </Button>
        </form>
    );
};

export default ProductForm;
