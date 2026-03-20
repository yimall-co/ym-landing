'use memo'

import type { SVGProps } from 'react';

import { cn } from '@yimall/ui';

type Props = Readonly<SVGProps<SVGSVGElement>>;

export default function LogoElement({
    fill,
    width,
    height,
    preserveAspectRatio = 'xMidYMid meet',
    className,
    ...props
}: Props) {
    'use memo'

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox='0 0 1060 1060'
            preserveAspectRatio={preserveAspectRatio}
            className={cn('size-full', className)}
            {...props}
        >
            <g clipPath="url(#a)">
                <path
                    fill={fill}
                    d="M1 323.92v736.38c245.3 0 490.59.02 735.89.02 178.34 0 322.92-144.57 322.93-322.91 0-245.47.02-490.94.02-736.41H323.92C145.58 1 1 145.58 1 323.92Z"
                />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="#fff" d="M0 0h1060v1060H0z" />
                </clipPath>
            </defs>
        </svg>
    );
}
