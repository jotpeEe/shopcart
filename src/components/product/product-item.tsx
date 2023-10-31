import { Fragment } from 'react';

import { AiOutlineShop } from 'react-icons/ai';
import { RiStarSFill } from 'react-icons/ri';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    Slider,
} from '@/components/ui';

import ProductsDescriptionAndFit from './product-description-and-fit';
import ProductForm from './product-form';
import { ProductsMaterialAndSuppliers } from './product-materials-and-supliers';

const items = ['HM.com', 'Women', 'Basics', 'Tops', 'Long Sleeve'];

const Stars = () => (
    <ul className="flex">
        {Array.from({ length: 5 }, (_, index) => index + 1).map((_, index) => (
            <li key={index} className="flex items-center justify-center">
                <RiStarSFill />
            </li>
        ))}
    </ul>
);

const ProductItem = () => {
    return (
        <section className="space-y-10">
            <div className="flex justify-center space-x-2 text-xs">
                {items.map((item, index) => (
                    <Fragment key={index}>
                        <span key={item} className="">
                            {item}
                        </span>
                        {index !== items.length - 1 && <span>/</span>}
                    </Fragment>
                ))}
            </div>
            <div className="grid grid-cols-2">
                <div className=""></div>
                <div className="space-y-8">
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="font-semibold">
                                3-pack jersey tops
                            </div>
                            <div className="group p-2">
                                <svg
                                    width="25"
                                    height="24"
                                    viewBox="0 0 17 17"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8.01442 2.64504L7.19498 1.72319C5.27153 -0.44072 1.74463 0.306017 0.471467 3.02653C-0.126255 4.30612 -0.261113 6.15357 0.83033 8.51135C1.88177 10.7816 4.06923 13.5008 8.01442 16.4628C11.9596 13.5008 14.1459 10.7816 15.1985 8.51135C16.29 6.15232 16.1562 4.30612 15.5574 3.02653C14.2842 0.306017 10.7573 -0.441971 8.83386 1.72194L8.01442 2.64504Z"
                                        fill="white"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M7.19498 1.72319L8.01442 2.64504L8.83386 1.72194C10.7573 -0.441971 14.2842 0.306017 15.5574 3.02653C16.1562 4.30612 16.29 6.15232 15.1985 8.51135C14.1459 10.7816 11.9596 13.5008 8.01442 16.4628C4.06923 13.5008 1.88177 10.7816 0.83033 8.51135C-0.261113 6.15357 -0.126255 4.30612 0.471467 3.02653C1.74463 0.306017 5.27153 -0.44072 7.19498 1.72319Z"
                                        className="fill-white group-hover:fill-red-600 dark:fill-black"
                                    />
                                    <path
                                        d="M8.01442 2.64504L7.19498 1.72319C5.27153 -0.44072 1.74463 0.306017 0.471467 3.02653C-0.126255 4.30612 -0.261113 6.15357 0.83033 8.51135C1.88177 10.7816 4.06923 13.5008 8.01442 16.4628C11.9596 13.5008 14.1459 10.7816 15.1985 8.51135C16.29 6.15232 16.1562 4.30612 15.5574 3.02653C14.2842 0.306017 10.7573 -0.441971 8.83386 1.72194L8.01442 2.64504Z"
                                        className="stroke-black group-hover:stroke-red-600 dark:stroke-white"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="">£24.99</div>
                    </div>
                    <div className="space-y-4">
                        <div className="text-xs font-semibold tracking-widest">
                            White/Beige/Black
                        </div>
                        <div className="h-16 w-[42px] bg-black dark:bg-white"></div>
                    </div>
                    <ProductForm />
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center gap-1">
                            <AiOutlineShop className="h-4 w-4" />
                            <span className="text-xs font-medium leading-3 underline">
                                Find in store
                            </span>
                        </div>
                        <div className="flex items-start gap-1">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                            >
                                <path
                                    d="M8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0ZM8 0.842105C6.10161 0.842105 4.28097 1.59624 2.9386 2.9386C1.59624 4.28097 0.842105 6.10161 0.842105 8C0.842105 9.89839 1.59624 11.719 2.9386 13.0614C4.28097 14.4038 6.10161 15.1579 8 15.1579C8.93999 15.1579 9.87077 14.9728 10.7392 14.613C11.6076 14.2533 12.3967 13.7261 13.0614 13.0614C13.7261 12.3967 14.2533 11.6076 14.613 10.7392C14.9728 9.87077 15.1579 8.93999 15.1579 8C15.1579 6.10161 14.4038 4.28097 13.0614 2.9386C11.719 1.59624 9.89839 0.842105 8 0.842105ZM7.57895 11.7895V10.1053H8.42105V11.7895H7.57895ZM7.57895 8.42105V4.21053H8.42105V8.42105H7.57895Z"
                                    fill="white"
                                />
                            </svg>
                            <span className="pt-1 text-xs font-medium leading-3">
                                Free standard delivery for Members when spending
                                £30 or more. Free Click and Collect. Free and
                                flexible returns for members
                            </span>
                        </div>
                        <div className="flex items-center justify-center pt-4 text-base font-semibold">
                            <button>Delivery and Payment</button>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="flex gap-2">
                            <Stars />
                            <span className="text-sm font-medium">
                                (51 reviews)
                            </span>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <span className="text-xs font-medium">
                                    True to size
                                </span>
                                <Slider
                                    defaultValue={[40]}
                                    max={100}
                                    disabled
                                    step={1}
                                />
                                <div className="flex justify-between text-xs font-medium text-muted-foreground">
                                    <span>Small</span>
                                    <span>Spot on</span>
                                    <span>Large</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <span className="text-xs font-medium">
                                    Length
                                </span>
                                <Slider
                                    defaultValue={[45]}
                                    max={100}
                                    disabled
                                    step={1}
                                />
                                <div className="flex justify-between text-xs font-medium text-muted-foreground">
                                    <span>Short</span>
                                    <span>Spot on</span>
                                    <span>Long</span>
                                </div>
                            </div>
                        </div>
                        <div className="pt-8">
                            <div className="h-[1px] w-full bg-gray-200 dark:bg-gray-200/10"></div>
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full"
                            >
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="font-semibold">
                                        Description & fit
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ProductsDescriptionAndFit />
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger className="font-semibold">
                                        Materials & suppliers
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ProductsMaterialAndSuppliers />
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductItem;
