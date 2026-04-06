import { notFound } from 'next/navigation';

type Props = Readonly<object>;

export default function CatchAllPage({ }: Props) {
    notFound();
}
