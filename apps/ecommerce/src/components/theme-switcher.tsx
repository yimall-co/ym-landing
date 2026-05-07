'use client';

import type { SwitcherOpts } from '@yimall/ui';

import dynamic from 'next/dynamic';

import { useTheme } from 'next-themes';
import {
    MonitorIcon,
    MoonStarIcon,
    SunIcon,
} from 'lucide-react';

const Switcher = dynamic(
    () => import('@yimall/ui').then((module) => module.Switcher),
    {
        ssr: false,
    },
);

type Props = Readonly<object>;

const options: Array<SwitcherOpts> = [
    {
        icon: <MonitorIcon />,
        value: 'system',
    },
    {
        icon: <SunIcon />,
        value: 'light',
    },
    {
        icon: <MoonStarIcon />,
        value: 'dark',
    },
];

export default function ThemeSwitcher({ }: Props) {
    'use memo'
    const { setTheme, resolvedTheme } = useTheme();

    return (
        <Switcher
            layoutId='theme'
            current={resolvedTheme}
            setCurrent={setTheme}
            options={options}
        />
    );
}
