import { Suspense } from 'react';
import { SearchBar } from '@/components/search-bar';
import { MovieCard } from '@/components/movie-card';
import { fetchTrendingMovies, Movie } from '@/lib/tmdb';
import { Film } from 'lucide-react';

export default async function HomePage() {
  let trendingMovies: Movie[] = [];
  let error: string | null = null;

  try {
    trendingMovies = await fetchTrendingMovies();
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load trending movies';
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-visible">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-pink-500/10 blur-3xl" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-primary to-purple-400 bg-clip-text text-transparent leading-tight">
            Discover Your Next
            <br />
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Favorite Movie
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Search through millions of movies, get ratings, watch trailers, and
            save your favorites.
          </p>
          <Suspense fallback={<div className="h-10" />}>
            <SearchBar />
          </Suspense>
        </div>
      </section>

      {/* Trending Movies */}
      <section className="container mx-auto px-4 py-12 relative" style={{ zIndex: 1 }}>
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 rounded-lg bg-primary/20">
            <Film className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-muted-foreground bg-clip-text text-transparent">
            Trending Movies
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent ml-4" />
        </div>

        {error ? (
          <div className="text-center py-12">
            <p className="text-destructive mb-4">{error}</p>
            <p className="text-sm text-muted-foreground">
              Make sure you have set NEXT_PUBLIC_TMDB_API_KEY in your .env file
            </p>
          </div>
        ) : trendingMovies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No trending movies found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {trendingMovies.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} index={index} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

