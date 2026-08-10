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
  title: "StackVura Technologies | Decentralized Cloud & Web3 Infrastructure",
  description: "Enterprise tech firm specializing in DevSecOps, Smart Contract Auditing, and Workflow Automation. We build secure, scalable solutions for SMEs and Web3 projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${firaCode.variable} font-sans bg-charcoal text-gray-300 antialiased min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
