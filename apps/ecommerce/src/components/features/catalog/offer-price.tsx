'use client';

import { useMemo } from 'react';

import { Heading } from '@yimall/ui';

type PriceWithDiscountProps = Readonly<{
    price: number | string;
    discount: number;
}>;

function toPriceInCOP(price: number) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
    }).format(price);
}

export default function PriceWithDiscount({
    price,
    discount = 0,
}: PriceWithDiscountProps) {
    'use memo'

    const hasDiscount = useMemo<boolean>(
        () => discount > 0,
        [discount,]
    );

    const parsedPrice = useMemo<number>(
        () => typeof price === 'string' ? Number(price) : price,
        [price],
    );

    const priceWithDiscountApplied = useMemo<number>(
        () => parsedPrice * (1 - discount / 100),
        [parsedPrice, discount,]
    );

    // If there isnt price, dont show it.
    if (parsedPrice === 0) return null;

    return (
        <div className='flex items-center gap-x-1'>
            {hasDiscount && (
                <Heading
                    level='3'
                    color='primary'
                    className=''
                >
                    {toPriceInCOP(priceWithDiscountApplied)}
                </Heading>
            )}
            <div className='flex items-center gap-x-1'>
                <Heading
                    color='primary'
                    level='3'
                    through={hasDiscount}
                    className=''
                >
                    {toPriceInCOP(parsedPrice)}
                </Heading>
            </div>
        </div>
    );
}
