import { Movie } from './tmdb';

const FAVORITES_KEY = 'movie-finder-favorites';

export function getFavorites(): Movie[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addToFavorites(movie: Movie): void {
  if (typeof window === 'undefined') return;
  const favorites = getFavorites();
  if (!favorites.find((m) => m.id === movie.id)) {
    favorites.push(movie);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFromFavorites(movieId: number): void {
  if (typeof window === 'undefined') return;
  const favorites = getFavorites();
  const filtered = favorites.filter((m) => m.id !== movieId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
}

export function isFavorite(movieId: number): boolean {
  if (typeof window === 'undefined') return false;
  const favorites = getFavorites();
  return favorites.some((m) => m.id === movieId);
}

