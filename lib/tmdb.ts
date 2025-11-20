const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids?: number[];
  genres?: Genre[];
  runtime?: number;
  credits?: {
    cast: CastMember[];
  };
  videos?: {
    results: Video[];
  };
}

export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface TMDBResponse<T> {
  results: T[];
  page: number;
  total_pages: number;
  total_results: number;
}

export function getImageUrl(path: string | null, size: 'w200' | 'w300' | 'w500' | 'w780' | 'original' = 'w500'): string {
  if (!path) return '';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

export async function fetchTrendingMovies(): Promise<Movie[]> {
  const response = await fetch(`${TMDB_BASE_URL}/trending/movie/day?api_key=${TMDB_API_KEY}`);
  if (!response.ok) throw new Error('Failed to fetch trending movies');
  const data: TMDBResponse<Movie> = await response.json();
  return data.results;
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const response = await fetch(
    `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
  );
  if (!response.ok) throw new Error('Failed to search movies');
  const data: TMDBResponse<Movie> = await response.json();
  return data.results;
}

export async function getMovieDetails(movieId: number): Promise<Movie> {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos`
  );
  if (!response.ok) throw new Error('Failed to fetch movie details');
  return await response.json();
}

export async function getGenres(): Promise<Genre[]> {
  const response = await fetch(`${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`);
  if (!response.ok) throw new Error('Failed to fetch genres');
  const data = await response.json();
  return data.genres;
}

export function getTrailerUrl(movie: Movie): string | null {
  if (!movie.videos?.results) return null;
  const trailer = movie.videos.results.find(
    (video) => video.site === 'YouTube' && video.type === 'Trailer'
  );
  return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
}

