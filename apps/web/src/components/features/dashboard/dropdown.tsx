'use client';

import {
    createDropdownHandler,
    DropdownMenu,
    DropdownMenuContent,
} from '@yimall/ui';

type Props = Readonly<{}>;

export const dashboardDropdownHandler = createDropdownHandler();

export default function DashboardDropdown({ }: Props) {

    return (
        <DropdownMenu handle={dashboardDropdownHandler}>
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
