import { useState } from 'react';

type UseNotification = Readonly<{
    isSupported: boolean;
}>;

export function useNotification(): UseNotification {
    const [isSupported] = useState<boolean>(
        () => 'serviceWorker' in navigator && 'PushManager' in window,
    );
    const [subscription, setSubscription] = useState<PushSubscription | null>(null);

    const subscribe = () => {
        if (typeof window === 'undefined') return;
    }

    return {
        isSupported,
    };
}
