'use client';

import Image from 'next/image';

type Props = Readonly<{
    src: string;
    alt: string;
}>;

export default function HeaderLogo({ src, alt }: Props) {
    'use memo'

    return (
        <div className='relative flex items-start h-full w-[120px]'>
            <Image
                fill
                src={src}
                alt={alt}
                loading='eager'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className='size-full self-start object-contain'
            />
        </div>
    );
}
