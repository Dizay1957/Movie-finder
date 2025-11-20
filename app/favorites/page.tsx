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
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Heart className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">My Favorites</h1>
            <span className="text-muted-foreground">
              ({favorites.length})
            </span>
          </div>
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-xl font-semibold mb-2">No favorites yet</p>
            <p className="text-muted-foreground mb-6">
              Start adding movies to your favorites!
            </p>
            <Link href="/">
              <Button>Browse Movies</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {favorites.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

