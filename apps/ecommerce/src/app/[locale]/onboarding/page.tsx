import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { clientEnv } from 'env/client';
import { cachedQueryClient } from 'lib/query-client';

import { getCustomizationData } from 'features/onboarding/actions';
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

    queryClient.prefetchQuery({
        queryKey: onboardingKeys.customization(workspaceId),
        queryFn: getCustomizationData,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Onboarding locale={locale} />
        </HydrationBoundary>
    );
}
