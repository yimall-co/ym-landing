'use client';

import type { FC, ComponentProps } from 'react';
import type {
    VariantProps,
    ClassValue,
} from 'tailwind-variants';

import {
    motion,
    AnimatePresence,
    MotionNodeAnimationOptions,
} from 'motion/react';
import { tv } from 'tailwind-variants';
import { ChevronUpIcon, ChevronDownIcon } from 'lucide-react';
import { Accordion as BaseAccordion } from '@base-ui/react/accordion';

const accordion = tv({
    slots: {
        root: [
            'w-full',
            'flex',
            'flex-col',
        ],
        item: ['not-last:border-b'],
        header: ['flex'],
        trigger: [
            'focus-visible:ring-ring/50',
            'focus-visible:border-ring',
            'focus-visible:after:border-ring',
            '**:data-[slot=accordion-trigger-icon]:text-muted-foreground',
            'rounded-lg',
            'py-2.5',
            'text-left',
            'text-base',
            'font-medium',
            'hover:underline',
            'focus-visible:ring-3',
            '**:data-[slot=accordion-trigger-icon]:ml-auto',
            '**:data-[slot=accordion-trigger-icon]:size-4',
            'group/accordion-trigger',
            'relative',
            'flex',
            'flex-1',
            'items-start',
            'justify-between',
            'border',
            'border-transparent',
            'transition-all',
            'outline-none',
            'aria-disabled:pointer-events-none aria-disabled:opacity-50',
        ],
        panel: [
            'pt-0',
            'pb-2.5',
            'text-start',
            '[&_a]:hover:text-foreground',
            'h-(--accordion-panel-height)',
            'data-ending-style:h-0',
            'data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4',
        ],
    },
});

type AccordionVariants = VariantProps<typeof accordion>;

type AccordionProps = AccordionVariants &
    ComponentProps<typeof motion.div> &
    ComponentProps<typeof BaseAccordion.Root>;

const Accordion: FC<AccordionProps> = ({
    className,
    ...props
}) => {
    'use memo';
    const { root } = accordion();

    return (
        <BaseAccordion.Root
            {...props}
            data-slot="accordion"
            className={root({
                className: className as ClassValue,
            })}
            render={<motion.div />}
        />
    );
};

Accordion.displayName = 'Accordion';

type AccordionItemProps = AccordionVariants
    & BaseAccordion.Item.Props
    & ComponentProps<typeof motion.div>;

const ACCORDION_ITEM_ANIMATION: MotionNodeAnimationOptions =
    {
        initial: {
            x: -9999,
        },
        animate: {
            x: 0,
        },
        transition: {
            duration: 0.85,
            ease: 'easeInOut',
        },
    } as const;

const AccordionItem: FC<AccordionItemProps> = ({
    className,
    ...props
}) => {
    'use memo';
    const { item } = accordion();

    return (
        <BaseAccordion.Item
            {...ACCORDION_ITEM_ANIMATION}
            {...props}
            data-slot="accordion-item"
            className={item({
                className: className as ClassValue,
            })}
            render={<motion.div />}
        />
    );
};

AccordionItem.displayName = 'AccordionItem';

type AccordionHeaderProps = AccordionVariants & BaseAccordion.Header.Props;

const AccordionHeader: FC<AccordionHeaderProps> = ({
    className,
    ...props
}) => {
    'use memo';
    const { header } = accordion();

    return (
        <BaseAccordion.Header
            {...props}
            data-slot="accordion-header"
            className={header({
                className: className as ClassValue,
            })}
        />
    );
};

type AccordionTriggerProps = AccordionVariants
    & BaseAccordion.Trigger.Props
    & ComponentProps<typeof motion.button>;

const AccordionTrigger: FC<AccordionTriggerProps> = ({
    className,
    children,
    ...props
}) => {
    'use memo';
    const { trigger } = accordion();

    return (
        <AccordionHeader>
            <BaseAccordion.Trigger
                {...props}
                data-slot="accordion-trigger"
                className={trigger({
                    className: className as ClassValue,
                })}
                render={<motion.button />}
            >
                {children}
                <ChevronDownIcon data-slot="accordion-trigger-icon" className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden" />
                <ChevronUpIcon data-slot="accordion-trigger-icon" className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline" />
            </BaseAccordion.Trigger>
        </AccordionHeader>
    );
};

AccordionTrigger.displayName = 'AccordionTrigger';

type AccordionPanelProps = AccordionVariants &
    ComponentProps<typeof motion.div> &
    ComponentProps<typeof BaseAccordion.Panel>;

const ACCORDION_PANEL_ANIMATION: MotionNodeAnimationOptions =
    {
        initial: {
            scale: 0,
            opacity: 0,
        },
        animate: {
            opacity: 1,
            scale: 1,
        },
        transition: {
            type: 'spring',
            duration: 1,
        },
    } as const;

const AccordionContent: FC<AccordionPanelProps> = ({
    className,
    children,
    ...props
}) => {
    'use memo';
    const { panel } = accordion();

    return (
        <AnimatePresence>
            <BaseAccordion.Panel
                key="panel"
                {...ACCORDION_PANEL_ANIMATION}
                {...props}
                data-slot='accordion-panel'
                className='data-open:animate-accordion-down data-closed:animate-accordion-up text-[15px] overflow-hidden'
                render={<motion.div />}
            >
                <div className={panel({
                    className: className as ClassValue,
                })}>
                    {children}
                </div>
            </BaseAccordion.Panel>
        </AnimatePresence>
    );
};

AccordionContent.displayName = 'AccordionPanel';

export {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
};
