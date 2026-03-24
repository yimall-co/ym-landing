import { setSession } from 'app/actions';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { payload } = await req.json();

    const { refreshTokenExpiresAt } = payload;

    const session = JSON.stringify(payload);
    await setSession(session, refreshTokenExpiresAt);

    return NextResponse.json({
        success: true,
    });
}
