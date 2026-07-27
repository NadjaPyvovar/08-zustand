import Link from 'next/link';
import css from './SidebarNotes.module.css';

const tags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href="/notes/filter/all" className={css.menuLink}>
          All notes
        </Link>
      </li>
      {tags.map(tag => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}

// adding filtering by notes' tag by means of parallel (i.e. @sidebar) & catch-all routes; default.tsx will be rendered into the slot by default
// note: in the task the code template uses the tag <a></a>, here <Link> is used in analogue to the lections; advantages of <Link>: gives client-side navigation, i.e. no full page reload, and prefetching (to reflect task requirement "URL changes... but the page itself does not reload")
// tags => hardcoded (acc to the task, there is no backend endpoint for tags) (i.e. const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"];)
