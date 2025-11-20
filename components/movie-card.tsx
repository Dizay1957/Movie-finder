'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, Film } from 'lucide-react';
import { Movie, getImageUrl } from '@/lib/tmdb';
import { formatDate } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { isFavorite, addToFavorites, removeFromFavorites } from '@/lib/favorites';
import { useState, useEffect } from 'react';

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

export function MovieCard({ movie, index = 0 }: MovieCardProps) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(movie.id));
  }, [movie.id]);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
    setFavorite(!favorite);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link href={`/movie/${movie.id}`}>
        <Card className="group overflow-hidden cursor-pointer h-full flex flex-col glass border-border/50 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-2">
          <div className="relative aspect-[2/3] w-full overflow-hidden bg-gradient-to-br from-muted to-muted/50 rounded-t-lg">
            {movie.poster_path ? (
              <Image
                src={getImageUrl(movie.poster_path, 'w500')}
                alt={movie.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Film className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">No Image</p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 glass backdrop-blur-md hover:bg-red-500/20 text-white z-10 transition-all duration-300"
              onClick={handleFavoriteToggle}
            >
              <Heart
                className={`h-5 w-5 transition-all duration-300 ${favorite ? 'fill-red-500 text-red-500 scale-110' : 'hover:scale-110'}`}
              />
            </Button>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4">
              <div className="flex items-center gap-2 text-white">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 drop-shadow-lg" />
                <span className="text-sm font-bold">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-xs text-gray-300/80">
                  ({movie.vote_count.toLocaleString()})
                </span>
              </div>
            </div>
          </div>
          <CardContent className="p-4 flex-1 flex flex-col bg-card/50">
            <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
              {movie.title}
            </h3>
            <p className="text-xs font-medium text-primary/80 mb-3">
              {formatDate(movie.release_date)}
            </p>
            <p className="text-sm text-muted-foreground line-clamp-2 flex-1 leading-relaxed">
              {movie.overview}
            </p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

