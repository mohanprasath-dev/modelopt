import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
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
    default: "ModelOpt - AI Model Optimization Engine",
    template: "%s | ModelOpt",
  },
  description:
    "Find the best AI model for your GPU and RAM with hardware-aware recommendations, benchmarks, and one-click install commands.",
  keywords: [
    "AI model optimizer",
    "LLM model recommendation",
    "GPU model selection",
    "VRAM calculator for LLM",
    "local AI model comparison",
    "Ollama model picker",
  ],
  applicationName: "ModelOpt",
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Mohan Prasath", url: "https://mohanprasath.dev" }],
  creator: "Mohan Prasath",
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ModelOpt",
    title: "ModelOpt - AI Model Optimization Engine",
    description:
      "Hardware-aware AI model recommendations for local and cloud inference. Compare models, fit VRAM limits, and deploy faster.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "ModelOpt - AI Model Optimization Engine",
    description:
      "Compare and optimize AI models for your hardware with instant recommendations.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ModelOpt",
    url: siteUrl,
    logo: `${siteUrl}/favicon.ico`,
    founder: {
      "@type": "Person",
      name: "Mohan Prasath",
      url: "https://mohanprasath.dev",
    },
    sameAs: [
      "https://github.com/mohanprasath-dev",
      "https://linkedin.com/in/mohanprasath21",
      "https://mohanprasath.dev",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ModelOpt",
    url: siteUrl,
    inLanguage: "en",
  };

  return (
    <html lang="en" className={cn("dark font-sans", inter.variable, jetBrainsMono.variable)}>
      <body className={cn("min-h-screen bg-slate-950", inter.className)}>
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
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
