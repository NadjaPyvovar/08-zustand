import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import Notes from "./Notes.client";

const PER_PAGE = 12;

interface FilterNotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function FilterNotesPage({ params }: FilterNotesPageProps) {
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () => fetchNotes({ page: 1, perPage: PER_PAGE, search: "", tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes key={tag} tag={tag} />
    </HydrationBoundary>
  );
}

// notes: 
// re. tag: in cath-call rout [...slug], Next.js hands params.slug as a string array (e.g. /notes/filter/Work => slug = ["Work"]); taking slug[0] and converting "all" to undefined in the server component directly, than passing this already "normalized" tag down 
// tag={tag}: when navigating e.g. from /notes/filter/Work to notes/filter/Personal, Next.js re-renders the same page.tsx/Notes component instance (=> the same position in the tree), i.e. it does not unmount/remount it. Thus the local page state would not reset automatically, leading to wrong UI (i.e. if a user is on page 3 of "Work" notes nad switches to "Personal" with only 1 page, the result could be empty); giving <Notes> a key tied to tag, tells React to treat each tag as distinct component instance, i.e. page & search state reset whenever the tag changes 