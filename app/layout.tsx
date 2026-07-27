import type { Metadata } from "next";
import "modern-normalize/modern-normalize.css";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

// defining the default page title & description used for SEO: 
export const metadata: Metadata = {
  title: "NoteHub",
  description: "Manage your personal notes with NoteHub",
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
      <body>
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