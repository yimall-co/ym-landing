'use client';

import {
    createPopoverHandler,
    Popover,
    PopoverContent,
    PopoverViewport,
} from '@yimall/ui';

type Props = Readonly<object>;

export const rootPopoverHandler = createPopoverHandler()

export default function RootPopover({ }: Props) {
    return (
        <Popover
            triggerId='root'
            handle={rootPopoverHandler}
        >
            {({ payload, }) => {
                if (typeof payload === 'undefined') return null;

                const { Component, ...rest } = payload;

                return (
                    <PopoverContent {...rest}>
                        <PopoverViewport>
                            {Component && <Component />}
                        </PopoverViewport>
                    </PopoverContent>
                );
            }}
        </Popover>
    );
}
