'use client';

import { useState, FormEvent, useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Film, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Movie, getImageUrl } from '@/lib/tmdb';
import { formatDate } from '@/lib/utils';

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchSuggestions = useCallback(async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/search-suggestions?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setSuggestions(data.results || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Debounce the search
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSuggestionClick = (movie: Movie) => {
    setQuery(movie.title);
    setShowSuggestions(false);
    router.push(`/movie/${movie.id}`);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} className="w-full max-w-2xl mx-auto relative" style={{ zIndex: 9999 }}>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary z-10" />
            <Input
              type="text"
              placeholder="Search for a movie... (e.g., Inception, Deadpool 3)"
              value={query}
              onChange={handleInputChange}
              onFocus={() => {
                if (suggestions.length > 0) {
                  setShowSuggestions(true);
                }
              }}
              className="pl-12 pr-12 h-14 text-lg glass border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background/50 backdrop-blur-sm"
            />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors p-1 rounded-full hover:bg-primary/10"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button type="submit" className="h-14 px-8 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300">
            Search
          </Button>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && (suggestions.length > 0 || isLoading) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{ zIndex: 10000 }}
            className="absolute top-full left-0 right-0 mt-3 glass border border-border/50 rounded-xl shadow-2xl shadow-primary/20 max-h-[400px] overflow-y-auto backdrop-blur-xl"
          >
            {isLoading ? (
              <div className="p-4 text-center text-muted-foreground">
                <div className="animate-pulse">Searching...</div>
              </div>
            ) : suggestions.length > 0 ? (
              <div className="py-2 overflow-y-auto">
                {suggestions.map((movie) => (
                  <motion.div
                    key={movie.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ backgroundColor: 'hsl(var(--accent))' }}
                    className="px-4 py-3 cursor-pointer flex items-center gap-3 hover:bg-accent transition-colors"
                    onClick={() => handleSuggestionClick(movie)}
                  >
                    <div className="relative w-12 h-16 flex-shrink-0 rounded overflow-hidden bg-muted">
                      {movie.poster_path ? (
                        <Image
                          src={getImageUrl(movie.poster_path, 'w200')}
                          alt={movie.title}
                          width={48}
                          height={64}
                          className="object-cover"
                          sizes="48px"
                          unoptimized
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Film className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate">{movie.title}</h4>
                      {movie.release_date && (
                        <p className="text-xs text-muted-foreground">
                          {formatDate(movie.release_date)}
                        </p>
                      )}
                      {movie.vote_average > 0 && (
                        <p className="text-xs text-muted-foreground">
                          ⭐ {movie.vote_average.toFixed(1)}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

