'use client';

import {
    BasePopover,
    Popover,
    PopoverContent,
    PopoverViewport,
} from '@yimall/ui';

type Props = Readonly<{}>;

export const appPopoverHandler = BasePopover.createHandle();

export default function AppPopover({ }: Props) {

    return (
        <Popover handle={appPopoverHandler}>
            {({ payload: Payload }) => (
                <PopoverContent>
                    <PopoverViewport>
                        {Payload && <Payload />}
                    </PopoverViewport>
                </PopoverContent>
            )}
        </Popover>
    );
}
