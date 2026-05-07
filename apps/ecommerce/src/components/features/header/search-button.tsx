'use client';

import { startTransition } from 'react';
import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import { useProgress } from 'react-transition-progress';

import { useRouter } from 'lib/i18n';

import { useForesight } from 'shared/hooks';

import { Button } from '@yimall/ui';

type Props = Readonly<{
    router: ReturnType<typeof useRouter>;
    startProgress: ReturnType<typeof useProgress>;
    startTransition: typeof startTransition;
}>;

export default function HeaderSearchButton({
    router,
    startProgress,
    startTransition,
}: Props) {
    'use memo'

    const t = useTranslations('Header');

    const { elementRef } = useForesight<HTMLButtonElement>({
        callback: () => router.prefetch({ pathname: '/search' }),
        hitSlop: 20,
        name: 'search-button',
    });

    const handleTouch = () => startTransition(() => {
        startProgress();
        router.push({ pathname: '/search' });
    });

    return (
        <Button
            ref={elementRef}
            size='lg'
            shape='pill'
            variant='default'
            className='grow bg-foreground/5 border-none justify-start px-6'
            onClick={handleTouch}
        >
            <Search className='size-4' />
            <span className='text-xs'>
                {t('search')}
            </span>
        </Button>
    );
}
