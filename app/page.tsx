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
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover Your Next
            <span className="text-primary"> Favorite Movie</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Search through millions of movies, get ratings, watch trailers, and
            save your favorites.
          </p>
          <Suspense fallback={<div className="h-10" />}>
            <SearchBar />
          </Suspense>
        </div>
      </section>

      {/* Trending Movies */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <Film className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Trending Movies</h2>
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

