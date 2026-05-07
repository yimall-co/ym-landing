'use client';

import type { CatalogProps } from 'pages/catalog';

import ForesightLink from 'components/foresight-link';

type Props = CatalogProps

export default function CatalogDesktop({ t, locale }: Props) {
    return (
        <div>
            <h1>Catalog Desktop</h1>
            <ForesightLink href={'/location'}>
                Ubicación
            </ForesightLink>
        </div>
    );
}
