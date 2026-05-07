'use client';

import type { HeaderProps } from 'layouts/header';

import HeaderAction from 'features/header/action';
import HeaderLogo from 'features/header/logo';
import HeaderSearchButton from 'features/header/search-button';

type Props = HeaderProps;

export default function HeaderDesktop({
    actions,
    router,
    startProgress,
    startTransition,
}: Props) {
    'use memo'

    return (
        <div className='size-full flex items-center justify-between px-6'>
            <HeaderLogo
                src='https://ssfdpagynvyveoschegx.supabase.co/storage/v1/object/public/assets/la-perreria/logo.webp'
                alt='Collamiy'
            />
            <div className='grow flex items-center justify-center px-6'>
                <HeaderSearchButton
                    router={router}
                    startProgress={startProgress}
                    startTransition={startTransition}
                />
            </div>
            <div className='flex items-center gap-2'>
                {actions.map((action, index) => (
                    <HeaderAction key={index} {...action} />
                ))}
            </div>
        </div>
    );
}
