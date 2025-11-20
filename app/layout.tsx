import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Heart, Film } from "lucide-react";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Finder - Discover Your Next Favorite Film",
  description: "Search and discover movies using TMDB API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="border-b border-border/40 sticky top-0 z-40 glass backdrop-blur-xl">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent hover:scale-105 transition-transform">
              <Film className="h-6 w-6 text-primary" />
              Movie Finder
            </Link>
            <Link href="/favorites">
              <Button variant="ghost" className="hover:bg-primary/10 hover:text-primary transition-colors">
                <Heart className="h-5 w-5 mr-2" />
                Favorites
              </Button>
            </Link>
          </div>
        </nav>
        <main className="relative">{children}</main>
      </body>
    </html>
  );
}

