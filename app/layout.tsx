import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/next';
import '../styles/globals.css';  // Adjust path if your globals.css is elsewhere

// Decimal Font (for headlines/specific places)
const decimal = localFont({
  src: [
    {
      path: '../public/fonts/Decimal-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Decimal-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
  ],
  variable: '--font-decimal',
  display: 'swap',
});

// PP Neue Montreal Font (for body/other stuff)
const neueMontreal = localFont({
  src: [
    {
      path: '../public/fonts/PPNeueMontreal-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/PPNeueMontreal-Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/PPNeueMontreal-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/PPNeueMontreal-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
  ],
  variable: '--font-neue-montreal',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Applied Labs Hero',
  description: 'Hero section for Applied Labs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${decimal.variable} ${neueMontreal.variable}`}>
      <body className="font-neue-montreal">  {/* Sets PP Neue Montreal as default body font */}
        {children}
        <Analytics />
      </body>
    </html>
  );
}