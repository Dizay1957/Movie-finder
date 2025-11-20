import { Suspense } from 'react';
import { SearchResults } from '@/components/search-results';
import { SearchBar } from '@/components/search-bar';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || '';

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Search Movies
          </h1>
          <SearchBar />
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <Suspense
          fallback={
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading...</p>
            </div>
          }
        >
          <SearchResults query={query} />
        </Suspense>
      </section>
    </div>
  );
}

