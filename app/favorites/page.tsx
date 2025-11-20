'use client';

import { useState, useEffect } from 'react';
import { getFavorites } from '@/lib/favorites';
import { Movie } from '@/lib/tmdb';
import { MovieCard } from '@/components/movie-card';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
    
    // Listen for storage changes to update favorites in real-time
    const handleStorageChange = () => {
      setFavorites(getFavorites());
    };
    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically (for same-tab updates)
    const interval = setInterval(() => {
      setFavorites(getFavorites());
    }, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/20">
              <Heart className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-primary to-purple-400 bg-clip-text text-transparent">
                My Favorites
              </h1>
              <p className="text-muted-foreground mt-1">
                {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'} saved
              </p>
            </div>
          </div>
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex p-6 rounded-full bg-primary/10 mb-6">
              <Heart className="h-16 w-16 text-primary/50" />
            </div>
            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-muted-foreground bg-clip-text text-transparent">
              No favorites yet
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Start exploring and add movies to your favorites collection!
            </p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg shadow-primary/30">
                Browse Movies
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {favorites.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

