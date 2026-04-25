import type { Metadata, Viewport } from "next";
import { Kalam, Patrick_Hand } from 'next/font/google';
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

const kalam = Kalam({
  weight: ['700'],
  subsets: ['latin'],
  variable: '--font-kalam',
});

const patrickHand = Patrick_Hand({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-patrick-hand',
});

export const metadata: Metadata = {
  title: "TeamKJ Official | CFC Community",
  description: "Worship songs, lyrics, chords, and community activities for Couples for Christ.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "TeamKJ Official | CFC Community",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${kalam.variable} ${patrickHand.variable}`} suppressHydrationWarning>
      <body className="font-body bg-background text-foreground antialiased min-h-screen flex flex-col paper-texture" suppressHydrationWarning>
        <ThemeProvider>
          <AnimatedBackground />
          <Navbar />
          <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-20 relative z-10">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
