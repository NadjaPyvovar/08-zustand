import type { Metadata } from 'next';
import { ogImage } from '@/lib/metadata';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';

export const metadata: Metadata = {
  title: 'Create note | NoteHub',
  description:
    'Create a new note in NoteHub - add a title, content and tag to keep your thoughts organized.',
  openGraph: {
    title: 'Create note | NoteHub',
    description:
      'Create a new note in NoteHub - add a title, content and tag to keep your thoughts organized.',
    url: 'https://notehub.com/notes/action/create',
    images: [ogImage],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
