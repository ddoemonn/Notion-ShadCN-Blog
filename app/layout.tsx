import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ozzy's Blog - Frontend Engineer & UI/UX Enthusiast",
  description: "Explore the craft of frontend development, UI/UX design, and modern web technologies with Ozzy, a passionate frontend engineer.",
  keywords: ["frontend", "UI/UX", "React", "Next.js", "TypeScript", "web development"],
  authors: [{ name: "Ozzy" }],
  creator: "Ozzy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    title: "Ozzy's Blog - Frontend Engineer & UI/UX Enthusiast",
    description: "Explore the craft of frontend development, UI/UX design, and modern web technologies.",
    siteName: "Ozzy's Blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ozzy's Blog - Frontend Engineer & UI/UX Enthusiast",
    description: "Explore the craft of frontend development, UI/UX design, and modern web technologies.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <div className="relative flex min-h-screen flex-col bg-background text-foreground">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
