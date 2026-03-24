import { useMutation } from '@tanstack/react-query';

import { signIn } from '../actions';

export function useSignIn() {
    return useMutation({
        mutationKey: ['sign-in'],
        mutationFn: signIn,
        onSuccess: async (result) => {
            await fetch('/api/session', {
                method: 'POST',
                body: JSON.stringify({
                    payload: result.data,
                }),
            });

            return result;
        },
    });
}
