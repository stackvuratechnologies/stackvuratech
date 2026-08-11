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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${firaCode.variable} font-sans bg-slate-50 text-slate-800 antialiased min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
