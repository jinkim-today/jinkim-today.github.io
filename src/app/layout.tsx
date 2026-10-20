import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
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

const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
