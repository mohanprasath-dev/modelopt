import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ModelOpt by Mohan Prasath",
    template: "%s | ModelOpt",
  },
  description: "AI Model Optimization Engine - Find the perfect AI model for your hardware.",
  applicationName: "ModelOpt",
  authors: [{ name: "Mohan Prasath", url: "https://mohanprasath.dev" }],
  creator: "Mohan Prasath",
  openGraph: {
    type: "website",
    siteName: "ModelOpt by Mohan Prasath",
    title: "ModelOpt by Mohan Prasath",
    description: "Find your perfect AI model in seconds.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "ModelOpt by Mohan Prasath",
    description: "Find your perfect AI model in seconds.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark font-sans", inter.variable, jetBrainsMono.variable)}>
      <body className={cn("min-h-screen bg-slate-950", inter.className)}>
        <a
          href="#main-content"
          className="sr-only rounded-md bg-blue-500 px-3 py-2 text-white focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50"
        >
          Skip to content
        </a>
        <Navbar />
        <Breadcrumb />
        <div id="main-content" className="min-h-[calc(100dvh-4rem)]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
