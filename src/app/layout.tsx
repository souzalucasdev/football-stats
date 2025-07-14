import './globals.css';
import type { Metadata } from 'next';
import { Anta } from 'next/font/google';
import AppProviders from '@/components/AppProviders';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const anta = Anta({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anta',
});

export const metadata: Metadata = {
  title: 'Football Stats',
  description:
    'Explore the latest standings and upcoming matches of the world’s top football leagues!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${anta.variable} font-anta bg-custom-green-500 flex flex-col`}>
        <AppProviders>
          <NavBar />
          <main>{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
