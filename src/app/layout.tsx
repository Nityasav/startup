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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
