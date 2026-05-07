'use client';

import type { MouseEventHandler } from 'react';
import type { ForesightCallback } from 'js.foresight';

import { LucideIcon } from 'lucide-react';

import { useDevice } from 'shared/contexts/device';
import { useForesight } from 'shared/hooks';

import { Button, cn } from '@yimall/ui';
import { useMounted } from '@yimall/ui/hooks';

type Props = Readonly<{
    icon: LucideIcon;
    isActive?: boolean;
    tooltip?: string;
    callback: ForesightCallback;
    onClick: MouseEventHandler<HTMLButtonElement>;
}>;

export default function HeaderAction({
    icon: Icon,
    isActive,
    tooltip,
    callback,
    onClick,
}: Props) {
    'use memo';
    const mounted = useMounted();

    const { isMobile } = useDevice();
    const { elementRef } = useForesight<HTMLButtonElement>({
        callback,
        hitSlop: isMobile ? 20 : 10,
    });

    if (!mounted) return null;

    if (!isMobile) return (
        <>{tooltip}</>
    );

    return (
        <Button
            ref={elementRef}
            onClick={onClick}
            size='icon-lg'
            variant='ghost'
            className={cn(
                isActive ? 'text-primary' : 'text-foreground',
            )}
            tooltip={tooltip}
        >
            <Icon />
        </Button>
    );
}
