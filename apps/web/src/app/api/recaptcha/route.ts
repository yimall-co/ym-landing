import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';
import { NextRequest, NextResponse } from 'next/server';

import { clientEnv } from 'env/client';
import { serverEnv } from 'env/server';

export async function POST(req: NextRequest) {
    const { token, action } = await req.json();

    const client = new RecaptchaEnterpriseServiceClient({
        apiKey: serverEnv.RECAPTCHA_API_KEY,
    });
    const projectPath = client.projectPath(clientEnv.NEXT_PUBLIC_RECAPTCHA_PROJECT_ID);

    const request = ({
        assessment: {
            event: {
                token,
                siteKey: clientEnv.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
                expectedAction: action,
            },
        },
        parent: projectPath,
    });

    const [response] = await client.createAssessment(request);

    if (!response.tokenProperties?.valid) {
        console.log(`The CreateAssessment call failed because the token was: ${response.tokenProperties?.invalidReason}`);
        return NextResponse.json({ score: null });
    }

    if (response.tokenProperties?.action === action) {
        return NextResponse.json({ score: response.riskAnalysis?.score });
    } else {
        return NextResponse.json({ score: null });
    }
}
