import type { Metadata } from 'next';
import { ogImage } from '@/lib/metadata';
import { Roboto } from 'next/font/google';
import 'modern-normalize/modern-normalize.css';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { BASE_URL } from "@/lib/constants";

// loading the Roboto font globally:
const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

// defining the default page title & description used for SEO:
export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Manage your personal notes with NoteHub',
  openGraph: {
    title: 'NoteHub',
    description: 'Manage your personal notes with NoteHub',
    url: `${BASE_URL}/`,
    images: [ogImage],
  },
};

// creating root layout component wrapping each page; wiring modal slot:
export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}

// note re. {modal}: placement of {modal} in JSX does not matter visually, as Modal component renders via createPortal(..., document.body), i.e. it always escapes to the very end of <body> regardless of where it is mounted in the tree
