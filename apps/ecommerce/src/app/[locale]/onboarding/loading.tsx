import { Skeleton } from '@yimall/ui';

export default function Loading() {
    return (
        <Skeleton className='h-dvh w-full p-6 flex flex-col gap-y-2 bg-neutral-600'>
            <Skeleton className='w-full h-40' />
            <Skeleton className='w-full h-full' />
            <Skeleton className='w-full h-10' />
        </Skeleton>
    );
}
