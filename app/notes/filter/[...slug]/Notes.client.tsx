'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import css from './Notes.module.css';

const PER_PAGE = 12;

interface NotesProps {
  tag?: string;
}

export default function Notes({ tag }: NotesProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['notes', page, search, tag],
    queryFn: () => fetchNotes({ page, perPage: PER_PAGE, search, tag }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const handleSearchChange = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearchChange} />

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {isLoading && <Loader />}
      {isError && (
        <ErrorMessage message="Something went wrong while fetching notes." />
      )}

      {data && data.notes.length > 0 && (
        <div
          className={isFetching ? css.contentFetching : undefined}
          aria-busy={isFetching}
        >
          <NoteList notes={data.notes} />
        </div>
      )}
    </div>
  );
}
