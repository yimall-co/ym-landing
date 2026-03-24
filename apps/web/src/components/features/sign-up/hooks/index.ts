import { useMutation } from '@tanstack/react-query';

import { signUp } from '../actions';

export function useSignUp() {
    return useMutation({
        mutationKey: ['sign-up'],
        mutationFn: signUp,
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
