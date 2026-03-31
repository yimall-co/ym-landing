'use client';

import {
    createPopoverHandler,
    Popover,
    PopoverContent,
    PopoverViewport,
} from '@yimall/ui';

type Props = Readonly<{}>;

export const appPopoverHandler = createPopoverHandler();

export default function AppPopover({ }: Props) {

    return (
        <Popover handle={appPopoverHandler}>
            {(context) => {
                const { payload } = context;
                if (typeof payload === 'undefined') return;

                const {
                    Component,
                    ...rest
                } = payload;

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
