'use client';

import type { CategoryItem } from 'lib/dtos/category';

import Image from 'next/image';

import { startTransition } from 'react';
import { motion } from 'motion/react';
import { useParams } from 'next/navigation';
import { useProgress } from 'react-transition-progress';

import { useResolvedPathname, useRouter } from 'lib/i18n';

import { useForesight } from 'shared/hooks';

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    cn,
    Paragraph
} from '@yimall/ui';

type Props = Readonly<{
    category: CategoryItem;
}>;

export default function CatalogCategoryCard({
    category,
}: Props) {
    'use memo'

    const router = useRouter();
    const params = useParams();
    const pathname = useResolvedPathname(params);
    const startProgress = useProgress();

    const { elementRef } = useForesight({
        callback: () => {
            if (category.slug === 'all') return;

            router.prefetch({
                pathname: '/categories/[categorySlug]',
                params: {
                    categorySlug: category.slug
                },
            });
        },
        hitSlop: 20,
        name: `category-card-${category.slug}`,
    });

    const handleTouch = () => {
        if (category.slug === 'all') return;

        startTransition(() => {
            startProgress();

            router.push({
                pathname: '/categories/[categorySlug]',
                params: {
                    categorySlug: category.slug
                },
            });
        });
    };

    const isActive = pathname === `/categories/${category.slug}` || (category.slug === 'all' && pathname === '/');
    const hasDescription = !!category?.description && category?.description.trim().length > 0;

    return (
        <motion.article
            ref={elementRef}
            role="button"
            tabIndex={0}
            aria-label={`Categoría ${category.label}`}
            initial={false}
            whileTap={{
                scale: 0.96
            }}
            transition={{
                type: 'spring',
                stiffness: 400,
                damping: 30
            }}
            className={cn(
                'group',
                'shrink-0',
                'w-28',
                'min-h-32',
                'px-3',
                'py-4',
                'rounded-3xl',
                'sm:w-26',
                'sm:min-h-28',
                'sm:px-2',
                'sm:py-3',
                'cursor-pointer',
                'border',
                'bg-background',
                'text-center',
                'active:shadow-md',
                'focus:outline-none',
                'focus-visible:ring-2',
                'focus-visible:ring-primary',
                'focus-visible:ring-offset-2',
                isActive ? 'border-primary ring-1 ring-primary' : 'border-(--foreground)/10',
            )}
            onClick={handleTouch}
        >
            <div className="flex flex-col items-center gap-y-3">
                <Avatar className={cn(
                    'relative',
                    'size-16',
                    'sm:size-14',
                    'border',
                    'border-(--foreground)/10'
                )}>
                    <AvatarImage
                        src={category.banner!}
                        render={
                            <Image
                                fill
                                alt={category.label}
                                src={category.banner!}
                                sizes='96px'
                                className='rounded-[inherit] object-cover'
                            />
                        }
                    />
                    <AvatarFallback>
                        {category.label.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <Paragraph className={cn(
                    'text-xs',
                    'font-medium',
                    'leading-tight',
                    'text-foreground'
                )}>
                    {category.label}
                </Paragraph>
                {hasDescription && (
                    <Paragraph className="sr-only">
                        {category.description}
                    </Paragraph>
                )}
            </div>
        </motion.article>
    );
}
