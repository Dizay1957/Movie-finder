import { getMovieDetails } from '@/lib/tmdb';
import { MovieDetails } from '@/components/movie-details';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const resolvedParams = await params;
  const movieId = parseInt(resolvedParams.id);

  if (isNaN(movieId)) {
    notFound();
  }

  let movie;
  try {
    movie = await getMovieDetails(movieId);
  } catch (e) {
    notFound();
  }

  return (
    <div>
      <div className="container mx-auto px-4 pt-4">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
      <MovieDetails movie={movie} />
    </div>
  );
}

