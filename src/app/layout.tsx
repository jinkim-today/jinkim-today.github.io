import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteDescription, siteTitle, siteUrl } from "@/content/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${siteTitle} | Forward-deployed & AI engineer`, template: `%s | ${siteTitle}` },
  description: siteDescription,
  openGraph: {
    type: "website",
    siteName: siteTitle,
    title: `${siteTitle} | Forward-deployed & AI engineer`,
    description: siteDescription,
    url: siteUrl,
    images: [{ url: "/og/default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/default.png"] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      style={{ colorScheme: "light" }}
      className={`${inter.variable} antialiased`}
    >
      <head>
        <meta name="color-scheme" content="light" />
      </head>
      <body className="flex min-h-screen flex-col">
        {children}
      </body>
    </html>
  );
}
