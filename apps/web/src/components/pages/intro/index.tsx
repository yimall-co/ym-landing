'use client'

import type { FC } from 'react';

import {
    useRef,
    useEffect,
} from 'react';
import { useTranslations } from 'next-intl';

import { visited } from 'app/actions';

import {
    Cubes,
    Section,
    SplitText,
    RotatingText,
    Paragraph,
} from '@yimall/ui';

type Props = Readonly<{}>;

const Intro: FC<Props> = () => {
    'use memo'
    const formRef = useRef<HTMLFormElement | null>(null);

    const t = useTranslations('Intro');

    useEffect(() => {
        if (!formRef.current) return;

        const timeout = setTimeout(() => {
            formRef.current?.requestSubmit();
        }, 5000);

        return () => clearTimeout(timeout);
    }, []);

    const [slogan, ...complements] = t('slogan').split(',');

    return (
        <Section className='h-dvh relative overflow-hidden'>
            <div className='size-full absolute top-0 left-0 -z-10'>
                <Cubes
                    easing='bounce.in'
                    gridSize={2}
                    rippleOnClick={false}
                    faceColor='var(--background)'
                    borderStyle='1px solid var(--background-alt)'
                />
            </div>
            <div className='size-full flex flex-col items-center justify-center p-5'>
                <div className='w-full flex flex-col gap-y-4'>
                    <SplitText
                        ease='bounce.out'
                        delay={100}
                        duration={0.5}
                        text={t('brand')}
                        className='text-6xl font-brand'
                    />
                    <div className='flex items-center justify-center gap-x-2 text-center'>
                        <Paragraph level='2'>{slogan}</Paragraph>
                        <RotatingText
                            texts={complements}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            initial={{ y: '100%', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: '-120%', opacity: 0 }}
                            animatePresenceMode='wait'
                            animatePresenceInitial={false}
                            rotationInterval={2000}
                            staggerDuration={0}
                            staggerFrom='random'
                            loop={true}
                            auto={true}
                            splitBy='characters'
                            mainClassName='text-lg bg-primary px-2 rounded-md text-white font-bold'
                            splitLevelClassName=''
                            elementLevelClassName=''
                        />
                    </div>
                </div>
            </div>
            <form ref={formRef} action={visited} />
        </Section>
    );
}

export default Intro;
