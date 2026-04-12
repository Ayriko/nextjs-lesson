import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Providers from "@/app/components/Providers";
import { WebVitals } from "@/app/components/WebVitals";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ma boutique trop bien",
    template: "%s | Ma boutique trop bien",
  },
  description: "Découvrez notre sélection de matériel technologique de qualité supérieure.",
  keywords: ["boutique", "technologie", "high-tech", "informatique"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Ma boutique trop bien",
    description: "Découvrez notre sélection de matériel technologique de qualité supérieure.",
    siteName: "Ma boutique trop bien",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${cormorant.variable} ${jost.variable} antialiased flex flex-col min-h-screen`}>
        <Providers>
          <WebVitals />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
