'use client';

import Error from 'next/error';

type Props = Readonly<object>;

export default function NotFoundPage({ }: Props) {
    return (
        <html lang='es' translate='no'>
            <body>
                <Error
                    statusCode={404}
                    title='Página no encontrada'
                />
            </body>
        </html>
    );
}
