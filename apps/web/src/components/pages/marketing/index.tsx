'use client'

import type { FC, MouseEventHandler } from 'react';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { clientEnv } from 'env/client';

import {
    Main,
    Badge,
    Button,
    Paragraph,
    CurvedLoop,
    GradientText,
} from '@yimall/ui';

import FaqAccordion from 'features/faq/accordion';

type Props = Readonly<{}>;

const Marketing: FC<Props> = () => {
    'use memo'
    const router = useRouter();
    const t = useTranslations('Marketing');

    const handleContact: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        window.open(`https://wa.me/${clientEnv.NEXT_PUBLIC_CONTACT_PHONE}`, '_blank');
    }

    return (
        <Main className='min-h-0 flex-1 relative'>
            <div className='flex flex-col items-center p-5 gap-y-4 text-center'>
                <Badge
                    color='primary'
                    variant='bubble'
                    className='px-6 py-1.5 drop-shadow-(--shadow-outer-light) shadow-(--shadow-inner-light) dark:drop-shadow-(--shadow-outer-dark) dark:shadow-(--shadow-inner-dark)'
                >
                    <Paragraph color='primary' className='text-base font-medium'>{t('greeting')}</Paragraph>
                </Badge>
                <GradientText
                    animationSpeed={5}
                    colors={[
                        '#423E3E',
                        'var(--foreground)',
                        'var(--color-primary)',
                    ]}
                    className='font-secondary font-extrabold text-[40px] leading-[46px] min-[380px]:text-[46px] min-[380px]:leading-[52px]'
                >
                    <h1>
                        {t('title')}
                    </h1>
                </GradientText>
                <GradientText className='font-alternative font-medium text-xl'>
                    {t('subtitle')}
                </GradientText>
                <div className='flex items-center gap-x-4'>
                    <Button
                        size='xl'
                        shape='pill'
                        className='font-secondary'
                        onClick={() => router.push('/demo')}
                    >
                        {t('actions.demo')}
                    </Button>
                    <Button
                        size='xl'
                        shape='pill'
                        variant='outline'
                        className='font-secondary'
                        onClick={handleContact}
                    >
                        {t('actions.contact')}
                    </Button>
                </div>
                <CurvedLoop
                    speed={1.5}
                    curveAmount={350}
                    direction='right'
                    marqueeText={t('marquee')}
                    containerClassName='min-h-0 mt-4'
                    className='fill-dark dark:fill-light'
                />
                <FaqAccordion />
            </div>
            <div className='h-screen'></div>
        </Main>
    );
}

export default Marketing;
