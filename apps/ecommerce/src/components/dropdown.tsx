'use client';

import {
    createDropdownHandler,
    DropdownMenu,
    DropdownMenuContent,
} from '@yimall/ui';

type Props = Readonly<{
    triggerId?: string;
}>;

export const rootDropdownHandler = createDropdownHandler();

export default function RootDropdown({
    triggerId = 'root'
}: Props) {
    return (
        <DropdownMenu triggerId={triggerId} handle={rootDropdownHandler} modal={false}>
            {({ payload }) => {
                if (typeof payload === 'undefined') return null;

                const { Component, ...rest } = payload;

                return (
                    <DropdownMenuContent {...rest}>
                        {Component && <Component {...rest} />}
                    </DropdownMenuContent>
                );
            }}
        </DropdownMenu>
    );
}
