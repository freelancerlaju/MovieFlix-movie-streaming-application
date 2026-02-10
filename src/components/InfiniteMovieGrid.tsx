"use client";

import { Movie } from "../../type";
import Image from "next/image";
import { getImagePath } from "@/lib/getImagePath";
import Link from "next/link";
import { Calendar, Star, Loader2 } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

interface InfiniteMovieGridProps {
  initialMovies: Movie[];
  endpoint: string;
}

const InfiniteMovieGrid = ({
  initialMovies,
  endpoint,
}: InfiniteMovieGridProps) => {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [mounted, setMounted] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(`${endpoint}?page=${page}`);
      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prev) => [...prev, ...data.results]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error loading more movies:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore, endpoint]);

  useEffect(() => {
    if (!mounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [mounted, loading, hasMore, loadMore]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <Link
            key={`${movie.id}-${movie.title}`}
            href={`/movie/${movie.id}`}
            className="block h-full"
          >
            <CardContainer className="inter-var h-full w-full">
              <CardBody className="bg-card relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-4 border transition-all duration-300 flex flex-col">
                <CardItem translateZ="50" className="w-full mt-2">
                  <div className="relative aspect-2/3 w-full overflow-hidden rounded-lg">
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
                      <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        <span className="text-xs font-bold text-white">
                          {movie.vote_average.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                </CardItem>

                <div className="flex flex-col flex-1 mt-4">
                  <CardItem
                    translateZ="60"
                    className="text-lg font-bold text-neutral-600 dark:text-white line-clamp-1"
                  >
                    {movie.title}
                  </CardItem>

                  <CardItem
                    as="p"
                    translateZ="40"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 line-clamp-2 flex-1"
                  >
                    {movie.overview || "No description available."}
                  </CardItem>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                    {movie.release_date && (
                      <CardItem
                        translateZ="30"
                        className="flex items-center gap-1.5 text-xs text-neutral-400"
                      >
                        <Calendar className="h-3.5 w-3.5" />
                        <span>
                          {new Date(movie.release_date).getFullYear()}
                        </span>
                      </CardItem>
                    )}
                    <CardItem
                      translateZ="20"
                      className="px-3 py-1.5 rounded-lg bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                    >
                      View Details
                    </CardItem>
                  </div>
                </div>
              </CardBody>
            </CardContainer>
          </Link>
        ))}
      </div>

      {/* Loading Indicator */}
      {hasMore && (
        <div
          ref={observerRef}
          className="flex justify-center items-center py-12"
        >
          {loading && (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                Loading more movies...
              </p>
            </div>
          )}
        </div>
      )}

      {!hasMore && movies.length > 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No more movies to load</p>
        </div>
      )}
    </>
  );
};

export default InfiniteMovieGrid;
