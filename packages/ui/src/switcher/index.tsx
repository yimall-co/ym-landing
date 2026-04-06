'use client';

import type { JSX } from 'react';

import { cn } from 'tailwind-variants';
import { motion } from 'motion/react';

type SwitcherOpts = {
    icon: JSX.Element;
    value: any;
};

type SwitcherOptionProps = SwitcherOpts & {
    isActive?: boolean;
    onClick?: (value: any) => void;
    layoutId: string;
};

function SwitcherOption({
    icon,
    value,
    isActive,
    onClick,
    layoutId,
}: SwitcherOptionProps) {
    'use memo'

    return (
        <button
            className={cn(
                'relative flex size-8 cursor-default items-center justify-center rounded-full transition-all [&_svg]:size-4',
                isActive
                    ? 'text-primary'
                    : 'text-zinc-400 hover:text-zinc-950',
            )}
            role='radio'
            aria-checked={isActive}
            aria-label={`Switch to ${value}`}
            onClick={() => onClick && onClick(value)}
        >
            {icon}
            {isActive && (
                <motion.div
                    layoutId={layoutId}
                    transition={{
                        type: 'spring',
                        bounce: 0.3,
                        duration: 0.6
                    }}
                    className='absolute inset-0 rounded-full border border-primary'
                />
            )}
        </button>
    );
}

type SwitcherProps = Readonly<{
    current: any;
    setCurrent: (value: any) => void;
    options: Array<SwitcherOpts>;
    layoutId: string;
}>;

function Switcher({
    current,
    options,
    setCurrent,
    layoutId,
}: SwitcherProps) {
    'use memo'

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className='inline-flex items-center overflow-hidden rounded-full bg-background ring-none ring-(--foreground) ring-inset'
            role='radiogroup'
        >
            {options?.map?.((option) => {
                return (
                    <SwitcherOption
                        layoutId={`${layoutId}-option`}
                        key={option.value}
                        icon={option.icon}
                        value={option.value}
                        isActive={current == option?.value}
                        onClick={() => setCurrent(option.value)}
                    />
                )
            }
            )}
        </motion.div>
    );
}

export type { SwitcherOpts };
export { Switcher, SwitcherOption };
