'use client'

import type { MarketingProps } from 'pages/marketing';

import {
    GradientText,
    Main,
} from '@yimall/ui';

type Props = MarketingProps;

export default function MarketingDesktop({
    t,
    router,
    handleContact,
}: Props) {
    'use memo'

    return (
        <Main className='min-h-0 flex-1 flex flex-col relative'>
            <div className='flex-1 flex flex-col w-full max-w-[1440px] mx-auto px-6'>
                <div className='flex-1 flex items-center justify-center'>
                    <div className='flex-1 flex flex-col'>
                        <GradientText
                            animationSpeed={5}
                            colors={[
                                '#423E3E',
                                'var(--foreground)',
                                'var(--color-primary)',
                            ]}
                            className='max-w-3xl font-primary-alt font-extrabold text-6xl leading-[64px]'
                        >
                            <h1 role='heading' aria-level={1}>{t('title')}</h1>
                        </GradientText>
                    </div>
                    <div className='flex-1'>
                        <h1>MarketingDesktop</h1>
                    </div>
                </div>
            </div>
        </Main>
    );
}
