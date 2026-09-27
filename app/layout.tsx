import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BOXING — AI Made Me Think I Could Box',
  description: 'A scroll-controlled boxing animation built with Next.js and liquid glass UI.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
