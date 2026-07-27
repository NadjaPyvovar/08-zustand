'use client';

import { useRouter } from 'next/navigation';
import type { ChangeEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createNote } from '@/lib/api';
import type { NoteTag } from '@/types/note';
import { useNoteStore } from '@/lib/store/noteStore';
import css from './NoteForm.module.css';

const TAGS: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const draft = useNoteStore(state => state.draft);
  const setDraft = useNoteStore(state => state.setDraft);
  const clearDraft = useNoteStore(state => state.clearDraft);

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.push('/notes/filter/all');
    },
  });

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setDraft({
      [name]: value,
    });
  };

  const handleCancel = () => {
    router.back();
  };

  const formAction = (formData: FormData) => {
    const title = String(formData.get('title') ?? '');
    const content = String(formData.get('content') ?? '');
    const tag = String(formData.get('tag') ?? 'Todo') as NoteTag;

    mutation.mutate({ title, content, tag });
  };

  return (
    <form action={formAction} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          value={draft.title}
          onChange={handleChange}
          minLength={3}
          maxLength={50}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={handleChange}
          maxLength={500}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={handleChange}
        >
          {TAGS.map(tag => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          Create note
        </button>
      </div>
    </form>
  );
}

// note re. defaultValue={draft.title} / defaultValue={draft.content} / defaultValue={draft.tag}: aligned with the lection materials, although more robust option would be value={draft.title} / etc, because defaultValue only applies on the first render (i.e. page opens => zustand hasn't hydrated from localStorage yet => input renders empty => zustand loads saved note draft => input does not update since it uses defaultValue (with zustand persist, hydration is async) => to avoid this - to use controlled inputs (aligned with the lessons))
