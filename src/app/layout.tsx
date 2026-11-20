import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/content/site";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | ${site.shortTitle}`,
    template: `%s | ${site.name}`,
  },
  description:
    "IT consulting, systems administration, technology operations, and digital product initiatives with Agboola Olomola.",
  metadataBase: new URL(site.origin || "http://localhost:3000"),
  openGraph: {
    title: `${site.name} | ${site.shortTitle}`,
    description:
      "Practical technology support for operations, systems, and digital product initiatives.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${display.variable} font-sans antialiased`}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
