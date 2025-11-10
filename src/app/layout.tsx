import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import ToastProvider from '@/components/ToastProvider';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

// Force dynamic rendering - prevent caching of pages
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'),
  title: 'PM Assessment Quiz - Discover Your Product Manager Archetype',
  description:
    'Find out what kind of PM you really are through AI-powered analysis. Get roasted (lovingly) by Claude AI and discover your unique product manager archetype.',
  keywords: [
    'product manager',
    'PM archetype',
    'product management',
    'AI assessment',
    'career quiz',
  ],
  authors: [{ name: 'PM Assessment Quiz' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/favicon.png', type: 'image/png', sizes: '256x256' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '128x128' },
    ],
  },
  openGraph: {
    title: 'What Kind of PM Are You?',
    description: 'Discover your Product Manager archetype through AI-powered analysis',
    type: 'website',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PM Assessment Quiz',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Kind of PM Are You?',
    description: 'Discover your Product Manager archetype through AI-powered analysis',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider />
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
