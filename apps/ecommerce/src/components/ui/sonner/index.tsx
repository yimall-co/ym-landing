'use client'

import type { ToasterProps } from 'sonner';

import { useTheme } from 'next-themes'
import { Toaster as BaseToaster } from 'sonner'
import {
    CircleCheckIcon,
    InfoIcon,
    TriangleAlertIcon,
    OctagonXIcon,
    Loader2Icon
} from 'lucide-react'

type Props = ToasterProps;

export function Toaster({
    ...props
}: Props) {
    const { theme = 'system' } = useTheme()

    return (
        <BaseToaster
            theme={theme as Props['theme']}
            className='toaster group'
            icons={{
                success: (
                    <CircleCheckIcon className="size-4" />
                ),
                info: (
                    <InfoIcon className="size-4" />
                ),
                warning: (
                    <TriangleAlertIcon className="size-4" />
                ),
                error: (
                    <OctagonXIcon className="size-4" />
                ),
                loading: (
                    <Loader2Icon className="size-4 animate-spin" />
                ),
            }}
            style={
                {
                    '--normal-bg': 'var(--background)',
                    '--normal-text': 'var(--foreground)',
                    // '--normal-border': 'var(--border)',
                    // '--border-radius': 'var(--radius)',
                } as React.CSSProperties
            }
            toastOptions={{
                classNames: {
                    toast: 'cn-toast z-50 border border-foreground/5 rounded-4xl',
                },
            }}
            {...props}
        />
    )
}
