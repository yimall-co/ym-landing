import qrcode from 'qrcode';

import { join } from 'node:path';

export async function generateQRCode(text: string): Promise<true | null> {
    try {
        const path = join(
            process.cwd(),
            './public/qrcode.png',
        );

        await qrcode.toFile(path, text);

        return true
    } catch (error) {
        console.error(error);
        return null;
    }
}