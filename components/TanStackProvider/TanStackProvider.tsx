'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function TanStackProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

// notes: added defaultOptions for queries: staleTime: 60 * 1000 => data is considered fresh for 60 sec before re-fetching => getting control over caching behavior and preventing unnecessary refetching (vs. the code from the lection/learning materials)
