"use client";
import Link from "next/link";
import { Movie } from "../../type";
import MovieCard from "./MovieCard";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

type Props = {
  title?: string;
  movies: Movie[];
  isVertical?: boolean;
};

const MovieContainer = ({ title, movies, isVertical }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollability();
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", checkScrollability);
      window.addEventListener("resize", checkScrollability);
      return () => {
        scrollElement.removeEventListener("scroll", checkScrollability);
        window.removeEventListener("resize", checkScrollability);
      };
    }
  }, [movies]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="space-y-4 relative">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight">
          {title}
        </h2>
        <Button variant="ghost" size="sm" asChild className="gap-1">
          <Link href={{ pathname: "/viewmore", query: { title: title } }}>
            View All
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="relative">
        {/* Previous Button */}
        {!isVertical && (
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity h-12 w-12 rounded-full shadow-lg disabled:opacity-30"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}

        {/* Movie List */}
        <div
          ref={scrollRef}
          className={cn(
            "flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth",
            isVertical && "flex-col gap-8",
          )}
        >
          {isVertical
            ? movies?.map((movie) => (
                <div
                  key={movie.id}
                  className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <MovieCard movie={movie} />
                  <div className="flex-1 space-y-2">
                    <h3 className="font-bold text-lg">
                      {movie?.title} ({movie?.release_date?.split("-")[0]})
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {movie?.overview}
                    </p>
                  </div>
                </div>
              ))
            : movies.map((movie, index) => (
                <motion.div
                  key={movie?.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                    ease: "easeOut",
                  }}
                  className="shrink-0"
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
        </div>

        {/* Next Button */}
        {!isVertical && (
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity h-12 w-12 rounded-full shadow-lg disabled:opacity-30"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}
      </div>
    </section>
  );
};

export default MovieContainer;
