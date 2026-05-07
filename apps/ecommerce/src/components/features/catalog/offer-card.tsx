'use client';

import type { OfferItem } from 'lib/dtos/offer';

import Image from 'next/image';

import { motion } from 'motion/react';
import { startTransition, useLayoutEffect } from 'react';
import { useProgress } from 'react-transition-progress';

import { useRouter } from 'lib/i18n';

import { useElementSize, useForesight } from 'shared/hooks';

import { cn, Heading } from '@yimall/ui';

import OfferPrice from './offer-price';
import OfferActions from './offer-actions';

type Props = Readonly<{
    offer: OfferItem;
}>;

export default function CatalogOfferCard({ offer }: Props) {
    'use memo'

    const router = useRouter();
    const startProgress = useProgress();

    const { ref, size } = useElementSize<HTMLElement>();
    const { elementRef } = useForesight({
        callback: () => router.prefetch({
            pathname: '/offers/[offerSlug]',
            params: { offerSlug: offer.slug }
        }),
        hitSlop: 20,
        name: `offer-card`,
    });

    const refCallback = (node: HTMLElement) => {
        if (ref) ref.current = node;
        if (elementRef) elementRef.current = node;
    };

    useLayoutEffect(() => {
        const handleResize = () => {
            document.documentElement.style.setProperty('--offer-card-height', `${size.height}px`);
            document.documentElement.style.setProperty('--offer-card-width', `${size.width}px`);
        }

        handleResize();

        return () => {
            document.documentElement.style.removeProperty('--offer-card-height');
            document.documentElement.style.removeProperty('--offer-card-width');
        }
    }, [size]);

    const handleTouch = () => startTransition(() => {
        startProgress();
        router.push({
            pathname: '/offers/[offerSlug]',
            params: { offerSlug: offer.slug }
        });
    });

    return (
        <motion.article
            ref={refCallback}
            className={cn(
                'relative',
                'w-full',
                'max-w-[680px]',
                'h-[680px]',
                'p-4',
                'bg-transparent',
                'rounded-3xl',
                'outline-none',
                'overflow-hidden',
                'md:cursor-pointer',
            )}
        >
            <Image
                fill
                loading='eager'
                src={'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                alt={''}
                className={cn(
                    'aspect-video',
                    'object-cover',
                    'rounded-[inherit]'
                )}
            />
            <div className='absolute top-4 right-4'>
                <OfferActions />
            </div>
            <div
                className='w-full flex flex-col gap-y-1 absolute bottom-0 left-0 p-4 rounded-t-3xl text-black bg-gray-200/20 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 backdrop-saturate-100 backdrop-contrast-100'
                onClick={handleTouch}
            >
                <Heading level='3' className='text-xl'>
                    {offer.title}
                </Heading>
                <div className='flex items-center gap-x-2'>
                    <span className='text-sm'>Category</span>
                    {'-'}
                    <span className='text-sm'>Subcategory</span>
                </div>
                <OfferPrice price={100000} discount={10} />
            </div>
        </motion.article>
    );
}
