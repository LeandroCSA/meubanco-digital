// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from '@/providers/ThemeProvider'
import { TransactionProvider } from "@/providers/TransactionsProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import ProtectedLayout from "@/components/ProtectedLayout";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MeuBanco Digital",
  description: "Projeto MeuBanco desenvolvido para a Idez Digital.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <TransactionProvider>
            <AuthProvider>
              <ProtectedLayout>{children}</ProtectedLayout>
            </AuthProvider>
          </TransactionProvider>
        </ThemeProvider>        
      </body>
    </html>
  );
}