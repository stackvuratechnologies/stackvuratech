import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import SchemaMarkup from '@/components/SchemaMarkup';
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter", 
});

const firaCode = Fira_Code({ 
  subsets: ["latin"],
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  title: "StackVura Technologies | Enterprise Cloud & Software",
  description: "Enterprise tech firm specializing in Custom Software, Cloud Architecture, and Automation.",
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://stackvuratechnologies.online',
    siteName: 'StackVura Technologies',
    title: 'StackVura Technologies | Enterprise Cloud Architecture',
    description: 'We build lightning-fast enterprise software, secure cloud infrastructures, and physical corporate branding.',
    images: [
      {
        url: 'https://stackvuratechnologies.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'StackVura Technologies Cover Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StackVura Technologies | Cloud & Software',
    description: 'Enterprise DevSecOps, Next.js Apps, and Web3 Integration.',
    images: ['https://stackvuratechnologies.online/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <SchemaMarkup />
      </head>
      <body>{children}</body>
    </html>
  );
}
