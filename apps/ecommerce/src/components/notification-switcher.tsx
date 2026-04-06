'use client';

import { useNotification } from 'shared/hooks';

import { Switch } from '@yimall/ui';

type Props = Readonly<object>;

export default function NotificationSwitcher({ }: Props) {
    const { isSupported } = useNotification();

    if (!isSupported) return null;

    return (
        <Switch />
    );
}
