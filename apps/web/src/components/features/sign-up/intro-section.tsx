'use client';

import { Heading, Paragraph } from '@yimall/ui';

type Props = Readonly<{
    title: string;
    subtitle: string;
    description: string;
}>;

export default function IntroSection({
    title,
    subtitle,
    description,
}: Props) {
    'use memo'

    return (
        <div className='flex flex-col gap-y-2'>
            <Heading level='2' className='flex flex-col text-2xl'>
                <span>{title}</span>
                <span>{subtitle}</span>
            </Heading>
            <Paragraph className='text-neutral-400'>{description}</Paragraph>
        </div>
    );
}
