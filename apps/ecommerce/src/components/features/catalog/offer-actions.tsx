'use client';

import { HeartIcon, MessageCircle } from 'lucide-react';

import { Toggle } from '@yimall/ui';

type Props = Readonly<object>;

export default function OfferActions({ }: Props) {
    'use memo'

    return (
        <div className='w-fit flex flex-col items-center justify-center'>
            <Toggle size='lg' badge={'300'}>
                <HeartIcon />
            </Toggle>
            <Toggle size='lg' badge={'117k'}>
                <MessageCircle />
            </Toggle>
        </div>
    );
}
