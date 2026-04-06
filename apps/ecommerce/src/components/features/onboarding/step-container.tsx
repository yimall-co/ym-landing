'use client';

import type { ReactNode } from 'react';

import { Article, Heading, Paragraph } from '@yimall/ui';

type Props = Readonly<{
    title: string;
    description?: string;
    children: ReactNode;
}>;

export default function OnboardingStepContainer({
    title,
    description,
    children,
}: Props) {
    return (
        <Article
            exit={{
                x: 0,
                scale: 1,
            }}
            className='flex-1 h-full flex flex-col gap-y-6 p-2 text-center'
        >
            <div className='flex flex-col gap-y-2'>
                <Heading level='2'>
                    {title}
                </Heading>
                {description && (
                    <Paragraph>
                        {description}
                    </Paragraph>
                )}
            </div>
            {children}
        </Article>
    );
}
