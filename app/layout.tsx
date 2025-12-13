import type React from 'react';
import type { Metadata } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { AIChatbot } from '@/components/ai-chatbot';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

// Cinzel is inspired by first-century roman inscriptions and is based on classical proportions.
// It conveys a timeless, classical sense of luxury and is often used in high-end branding.
const inter = Inter({ subsets: ['latin'] });
const _geistMono = Geist_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Somdev Solutions',
  description:
    'Premium technology solutions that transform businesses. Web development, AI integration, cloud solutions, and digital transformation.',
  authors: [{ name: 'Somdev Solutions' }],
  creator: 'Somdev Solutions',
  icons: {
    icon: '/Logo.png',
    shortcut: '/Logo.png',
    apple: '/Logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} font-sans antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <AIChatbot />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
