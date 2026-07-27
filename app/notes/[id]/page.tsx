import type { Metadata } from 'next';
import { ogImage } from '@/lib/metadata';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetails from './NoteDetails.client';

interface NoteDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: NoteDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  const description =
    note.content.length > 150
      ? `${note.content.slice(0, 150)}...`
      : note.content || 'View this note in NoteHub.';

  return {
    title: `${note.title} | NoteHub`,
    description,
    openGraph: {
      title: `${note.title} | NoteHub`,
      description,
      url: `https://notehub.com/notes/${id}`,
      images: [ogImage],
    },
  };
}

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails />
    </HydrationBoundary>
  );
}
