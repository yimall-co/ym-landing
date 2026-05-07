'use client';

import type { OfferItem } from 'lib/dtos/offer';

import { motion } from 'motion/react';

import { useMounted } from '@yimall/ui/hooks';

import CatalogOfferCard from './offer-card';

type Props = Readonly<{
    offers: Array<OfferItem>;
}>;

export default function CatalogOfferList({ offers }: Props) {
    'use memo'

    const mounted = useMounted();

    if (!mounted) return null;

    return (
        <motion.div className='py-4 flex flex-col gap-y-4'>
            {offers.map((offer, index) => (
                <CatalogOfferCard key={index} offer={offer} />
            ))}
        </motion.div>
    );
}
