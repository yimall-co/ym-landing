'use client'

import type { FC } from 'react';

import {
    Accordion,
    AccordionItem,
    AccordionContent,
    AccordionTrigger,
} from '@yimall/ui';

type Props = Readonly<{}>;

const FaqAccordion: FC<Props> = () => {
    'use memo'

    return (
        <Accordion>
            <AccordionItem>
                <AccordionTrigger>Frequently asked questions</AccordionTrigger>
                <AccordionContent>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae itaque temporibus adipisci quos cumque repellat quia reprehenderit corporis, modi provident.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

export default FaqAccordion;