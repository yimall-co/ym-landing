'use client';

import {
    createDropdownHandler,
    DropdownMenu,
    DropdownMenuContent,
} from '@yimall/ui';

type Props = Readonly<{}>;

export const appDropdownHandler = createDropdownHandler();

export default function AppDropdown({ }: Props) {

    return (
        <DropdownMenu handle={appDropdownHandler}>
            {(context) => {
                const { payload } = context;
                if (typeof payload === 'undefined') return;

                const {
                    Component,
                    ...rest
                } = payload;

                return (
                    <DropdownMenuContent {...rest}>
                        {Component && <Component />}
                    </DropdownMenuContent>
                );
            }}
        </DropdownMenu>
    );
}
