import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { AIProvider } from "@/components/ai/AIProvider";
import { OrderSound } from "@/components/notifications/OrderSound";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ASAP FOOD - Snabb Matleverans",
  description: "Beställ din favoritmat från lokala restauranger med snabb leverans",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <body className={inter.className}>
        <AIProvider>
          <Header />
          {children}
          <Footer />
          <Toaster />
          <OrderSound />
        </AIProvider>
      </body>
    </html>
  );
}