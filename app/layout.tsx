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
        <nav className="border-b sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Film className="h-6 w-6" />
              Movie Finder
            </Link>
            <Link href="/favorites">
              <Button variant="ghost">
                <Heart className="h-5 w-5 mr-2" />
                Favorites
              </Button>
            </Link>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}

