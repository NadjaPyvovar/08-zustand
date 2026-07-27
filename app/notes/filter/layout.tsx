import css from './LayoutNotes.module.css';

interface FilterLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function FilterLayout({ children, sidebar }: FilterLayoutProps) {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
}

// adding sidebar as a prop => Next.js automatically injects the parallel route slot into the layout as a prop with the same name as its folder (i.e. sidebar (without @))
