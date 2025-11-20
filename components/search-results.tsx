import { searchMovies, Movie } from '@/lib/tmdb';
import { MovieCard } from '@/components/movie-card';

interface SearchResultsProps {
  query: string;
}

export async function SearchResults({ query }: SearchResultsProps) {
  if (!query.trim()) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          Enter a movie name to start searching...
        </p>
      </div>
    );
  }

  let movies: Movie[] = [];
  let error: string | null = null;

  try {
    movies = await searchMovies(query);
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to search movies';
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive mb-4">{error}</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-2">
          No movies found for &quot;{query}&quot;
        </p>
        <p className="text-sm text-muted-foreground">
          Try a different search term.
        </p>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">
        Search Results for &quot;{query}&quot; ({movies.length} found)
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {movies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} />
        ))}
      </div>
    </>
  );
}

