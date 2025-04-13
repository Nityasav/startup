import type { Metadata } from "next";
import { Audiowide } from "next/font/google";
import "@fontsource/audiowide";
import "@fontsource/syncopate";
import "@fontsource/share-tech-mono";
import "./globals.css";
import BackgroundEffects from "./components/BackgroundEffects";
import Header from "./components/Header";
import { AuthProvider } from "@/context/AuthContext";

const audiowide = Audiowide({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-audiowide",
});

export const metadata: Metadata = {
  title: "StartupSight | Your Business Idea Advisor",
  description: "Analyze your business ideas, check market saturation, and assess feasibility with AI-powered insights.",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' }
    ],
    apple: '/images/logo.svg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
      </head>
      <body
        className={`${audiowide.variable} font-tech-mono antialiased`}
      >
        <AuthProvider>
          <BackgroundEffects />
          <Header />
          <main className="pt-20">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
