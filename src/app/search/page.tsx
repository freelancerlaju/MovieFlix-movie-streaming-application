"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Star } from "lucide-react";
import { getPopularMovies } from "@/lib/getMovies";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { getImagePath } from "@/lib/getImagePath";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Movie } from "../../../type";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const popular = await getPopularMovies();
      setPopularMovies(popular || []);
    };
    fetchPopularMovies();
  }, []);

  // Auto-search with debounce
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchTerm.trim().length >= 2) {
        setIsLoading(true);
        setHasSearched(true);
        try {
          console.log("Searching for:", searchTerm.trim());
          const response = await fetch(
            `/api/search?query=${encodeURIComponent(searchTerm.trim())}`
          );
          if (!response.ok) {
            throw new Error(`Search failed: ${response.statusText}`);
          }
          const results = await response.json();
          console.log("Search results:", results);
          setMovies(results || []);
        } catch (error) {
          console.error("Search error:", error);
          setMovies([]);
        } finally {
          setIsLoading(false);
        }
      } else if (searchTerm.trim().length === 0) {
        setHasSearched(false);
        setMovies([]);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleGenreClick = (genre: string) => {
    setSearchTerm(genre);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Search Movies
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover your favorite movies, explore new releases, and find
              hidden gems
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Enter movie name, actor, genre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-14 pl-12 pr-4 text-lg bg-card border-border focus-visible:ring-ring placeholder:text-muted-foreground"
                  autoFocus
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
              {searchTerm.trim().length > 0 && searchTerm.trim().length < 2 && (
                <p className="text-sm text-muted-foreground text-center">
                  Type at least 2 characters to search...
                </p>
              )}
            </div>

            {!hasSearched && (
              <div className="pt-8 border-t border-border">
                <h2 className="text-xl font-semibold mb-4 text-foreground">
                  Popular Searches
                </h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Action",
                    "Comedy",
                    "Drama",
                    "Thriller",
                    "Sci-Fi",
                    "Horror",
                    "Romance",
                    "Adventure",
                  ].map((genre) => (
                    <button
                      key={genre}
                      onClick={() => handleGenreClick(genre)}
                      className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-sm font-medium"
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search Results */}
          {hasSearched && (
            <div className="space-y-12 pt-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  Search Results for "{searchTerm.trim()}"
                </h2>
                {isLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="space-y-4">
                        <Skeleton className="h-[400px] w-full rounded-xl" />
                        <div className="space-y-2">
                          <Skeleton className="h-5 w-3/4" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-5/6" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : movies.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {movies.map((movie) => (
                      <Link
                        key={movie.id}
                        href={`/movie/${movie.id}`}
                        className="block h-full"
                      >
                        <CardContainer className="inter-var h-full w-full">
                          <CardBody className="bg-card relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-4 border transition-all duration-300 flex flex-col">
                            <CardItem translateZ="50" className="w-full mt-2">
                              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
                                <Image
                                  src={getImagePath(
                                    movie.poster_path || movie.backdrop_path
                                  )}
                                  alt={movie.title}
                                  fill
                                  className="object-cover group-hover/card:shadow-xl"
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                />
                                {/* Rating Badge */}
                                {movie.vote_average > 0 && (
                                  <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                    <span className="text-xs font-bold text-foreground">
                                      {movie.vote_average.toFixed(1)}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </CardItem>

                            <div className="flex flex-col justify-between flex-1 pt-4">
                              <div className="space-y-2">
                                <CardItem
                                  translateZ="60"
                                  className="text-lg font-bold text-card-foreground line-clamp-2 group-hover/card:text-primary transition-colors"
                                >
                                  {movie.title}
                                </CardItem>

                                {movie.release_date && (
                                  <CardItem
                                    translateZ="40"
                                    className="text-xs text-muted-foreground flex items-center gap-1"
                                  >
                                    <Calendar className="h-3 w-3" />
                                    {new Date(movie.release_date).getFullYear()}
                                  </CardItem>
                                )}

                                {movie.overview && (
                                  <CardItem
                                    translateZ="40"
                                    className="text-sm text-muted-foreground line-clamp-3"
                                  >
                                    {movie.overview}
                                  </CardItem>
                                )}
                              </div>
                            </div>
                          </CardBody>
                        </CardContainer>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground">
                      No movies found for "{searchTerm.trim()}". Try a different
                      search term.
                    </p>
                  </div>
                )}
              </div>
              {!isLoading && popularMovies.length > 0 && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    You May Also Like
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {popularMovies.slice(0, 8).map((movie) => (
                      <Link
                        key={movie.id}
                        href={`/movie/${movie.id}`}
                        className="block h-full"
                      >
                        <CardContainer className="inter-var h-full w-full">
                          <CardBody className="bg-card relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-4 border transition-all duration-300 flex flex-col">
                            <CardItem translateZ="50" className="w-full mt-2">
                              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
                                <Image
                                  src={getImagePath(
                                    movie.poster_path || movie.backdrop_path
                                  )}
                                  alt={movie.title}
                                  fill
                                  className="object-cover group-hover/card:shadow-xl"
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                />
                                {movie.vote_average > 0 && (
                                  <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                    <span className="text-xs font-bold text-foreground">
                                      {movie.vote_average.toFixed(1)}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </CardItem>

                            <div className="flex flex-col justify-between flex-1 pt-4">
                              <div className="space-y-2">
                                <CardItem
                                  translateZ="60"
                                  className="text-lg font-bold text-card-foreground line-clamp-2 group-hover/card:text-primary transition-colors"
                                >
                                  {movie.title}
                                </CardItem>

                                {movie.release_date && (
                                  <CardItem
                                    translateZ="40"
                                    className="text-xs text-muted-foreground flex items-center gap-1"
                                  >
                                    <Calendar className="h-3 w-3" />
                                    {new Date(movie.release_date).getFullYear()}
                                  </CardItem>
                                )}

                                {movie.overview && (
                                  <CardItem
                                    translateZ="40"
                                    className="text-sm text-muted-foreground line-clamp-3"
                                  >
                                    {movie.overview}
                                  </CardItem>
                                )}
                              </div>
                            </div>
                          </CardBody>
                        </CardContainer>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default SearchPage;
