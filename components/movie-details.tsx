'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, Clock, Calendar, TrendingUp, Heart, Play, X, Film } from 'lucide-react';
import { Movie, getImageUrl, getTrailerUrl } from '@/lib/tmdb';
import { formatRuntime, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { isFavorite, addToFavorites, removeFromFavorites } from '@/lib/favorites';

interface MovieDetailsProps {
  movie: Movie;
}

export function MovieDetails({ movie }: MovieDetailsProps) {
  const [favorite, setFavorite] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const trailerUrl = getTrailerUrl(movie);

  useEffect(() => {
    setFavorite(isFavorite(movie.id));
  }, [movie.id]);

  const handleFavoriteToggle = () => {
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
    setFavorite(!favorite);
  };

  const mainCast = movie.credits?.cast?.slice(0, 5) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Backdrop */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        {movie.backdrop_path && (
          <Image
            src={getImageUrl(movie.backdrop_path, 'original')}
            alt={movie.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {movie.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-white">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-xl font-semibold">
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-300">
                    /10 ({movie.vote_count.toLocaleString()} votes)
                  </span>
                </div>
                {movie.release_date && (
                  <div className="flex items-center gap-2 text-white">
                    <Calendar className="h-5 w-5" />
                    <span>{formatDate(movie.release_date)}</span>
                  </div>
                )}
                {movie.runtime && (
                  <div className="flex items-center gap-2 text-white">
                    <Clock className="h-5 w-5" />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-white">
                  <TrendingUp className="h-5 w-5" />
                  <span>#{Math.round(movie.popularity)}</span>
                </div>
              </div>
              <div className="flex gap-3">
                {trailerUrl && (
                  <Button
                    size="lg"
                    onClick={() => setShowTrailer(true)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Watch Trailer
                  </Button>
                )}
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleFavoriteToggle}
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  <Heart
                    className={`h-5 w-5 mr-2 ${favorite ? 'fill-red-500 text-red-500' : ''}`}
                  />
                  {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="overflow-hidden">
                <div className="relative aspect-[2/3] w-full">
                  {movie.poster_path ? (
                    <Image
                      src={getImageUrl(movie.poster_path, 'w500')}
                      alt={movie.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                      <div className="text-center">
                        <Film className="h-16 w-16 mx-auto mb-2 opacity-50" />
                        <p>No Image</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Details */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Overview */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {movie.overview || 'No overview available.'}
                  </p>
                </CardContent>
              </Card>

              {/* Cast */}
              {mainCast.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">Main Cast</h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {mainCast.map((actor) => (
                        <div key={actor.id} className="text-center">
                          <div className="relative aspect-[2/3] w-full mb-2 rounded-lg overflow-hidden bg-muted">
                            {actor.profile_path ? (
                              <Image
                                src={getImageUrl(actor.profile_path, 'w300')}
                                alt={actor.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw, 20vw"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                No Image
                              </div>
                            )}
                          </div>
                          <p className="text-sm font-semibold">{actor.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {actor.character}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailerUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setShowTrailer(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-white hover:bg-white/20"
              onClick={() => setShowTrailer(false)}
            >
              <X className="h-6 w-6" />
            </Button>
            <div className="aspect-video w-full rounded-lg overflow-hidden">
              <iframe
                src={trailerUrl.replace('watch?v=', 'embed/')}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

