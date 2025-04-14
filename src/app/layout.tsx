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
  title: "Venturly | Your Business Idea Advisor",
  description: "AI-powered business analysis and validation for entrepreneurs",
  icons: {
    icon: [
      { url: '/logo.png' }
    ],
    apple: '/logo.png',
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
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
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
