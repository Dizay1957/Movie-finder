import { NextRequest, NextResponse } from 'next/server';
import { searchMovies } from '@/lib/tmdb';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query || query.trim().length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const movies = await searchMovies(query.trim());
    // Return only top 5 suggestions for autocomplete
    return NextResponse.json({ results: movies.slice(0, 5) });
  } catch (error) {
    console.error('Search suggestions error:', error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}

