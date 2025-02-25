import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import { JetBrains_Mono } from 'next/font/google';

const jetBrainsMono = JetBrains_Mono({
  subsets:['latin'],
  display:'swap',
  variable:'--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'Tanay Matta',
  description: 'My raw, unfiltered portfolio website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetBrainsMono.variable}>
      <body className="bg-white text-black font-mono pt-32">
        <Navbar />
        <div className="border-l-4 border-black min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
