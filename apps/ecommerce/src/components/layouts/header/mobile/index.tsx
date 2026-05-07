'use client';

import type { HeaderProps } from 'layouts/header';

import { motion } from 'motion/react';

import HeaderAction from 'features/header/action';
import HeaderLogo from 'features/header/logo';
import HeaderSearchButton from 'features/header/search-button';

type Props = HeaderProps;

export default function HeaderMobile({
    actions,
    router,
    startProgress,
    startTransition,
}: Props) {
    'use memo'

    return (
        <div className='size-full flex flex-col px-4'>
            <motion.div className='grow flex items-center justify-between'>
                <HeaderLogo
                    src='https://ssfdpagynvyveoschegx.supabase.co/storage/v1/object/public/assets/la-perreria/logo.webp'
                    alt='Collamiy'
                />
                <div className='justify-end flex items-center gap-x-2'>
                    {actions.map((action, index) => (
                        <HeaderAction key={index} {...action} />
                    ))}
                </div>
            </motion.div>
            <motion.div className='grow flex items-center gap-x-2'>
                <HeaderSearchButton
                    router={router}
                    startProgress={startProgress}
                    startTransition={startTransition}
                />
            </motion.div>
        </div>
    );
}
