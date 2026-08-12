import SchemaMarkup from '@/components/SchemaMarkup';
import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
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