import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { clientEnv } from 'env/client';
import { cachedQueryClient } from 'lib/query-client';
import { getCustomization } from 'lib/data/customization';

import { onboardingKeys } from 'features/onboarding/hooks/keys';

import Onboarding from 'pages/onboarding';

type Props = Readonly<{
    params: Promise<{ locale: string }>;
}>;

export default async function OnboardingPage({ params }: Props) {
    const locale = (await params).locale;

    const cookieStore = await cookies();

    if (cookieStore.has('visited')) {
        return redirect(`/${locale}`);
    }

    const queryClient = cachedQueryClient();

    const workspaceId = clientEnv.NEXT_PUBLIC_WORKSPACE_ID;

    await queryClient.prefetchQuery({
        queryKey: onboardingKeys.customization(workspaceId),
        queryFn: () => getCustomization(workspaceId),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Onboarding locale={locale} />
        </HydrationBoundary>
    );
}
