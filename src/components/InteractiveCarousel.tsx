"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getImagePath } from "@/lib/getImagePath";
import { Movie } from "../../type";
import { Star, Play, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface InteractiveCarouselProps {
  movies: Movie[];
  title: string;
}

const InteractiveCarousel = ({ movies, title }: InteractiveCarouselProps) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragPosition, setDragPosition] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleMovies = 6;
  const maxIndex = Math.max(0, movies.length - visibleMovies);

  const handleDragStart = (e: React.MouseEvent) => {
    setDragStart(e.clientX);
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (dragStart !== null) {
      const diff = e.clientX - dragStart;
      setDragPosition(diff);
    }
  };

  const handleDragEnd = () => {
    if (dragPosition < -100 && currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    } else if (dragPosition > 100 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
    setDragStart(null);
    setDragPosition(0);
  };

  const slideLeft = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const slideRight = () => {
    setCurrentIndex(Math.min(maxIndex, currentIndex + 1));
  };

  return (
    <section className="py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={slideLeft}
            disabled={currentIndex === 0}
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={slideRight}
            disabled={currentIndex === maxIndex}
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex gap-4 transition-transform duration-500 ease-out cursor-grab active:cursor-grabbing"
          style={{
            transform: `translateX(calc(-${
              currentIndex * (100 / visibleMovies)
            }% - ${currentIndex * 16}px + ${dragPosition}px))`,
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
        >
          {movies.map((movie) => {
            const isHovered = hoveredId === movie.id;

            return (
              <div
                key={movie.id}
                className="relative group shrink-0 w-[calc(100%/2-8px)] sm:w-[calc(100%/3-11px)] md:w-[calc(100%/4-12px)] lg:w-[calc(100%/5-13px)] xl:w-[calc(100%/6-14px)]"
                onMouseEnter={() => setHoveredId(movie.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Link href={`/movie/${movie.id}`} className="block">
                  <div
                    className={`relative aspect-[2/3] rounded-xl overflow-hidden transition-all duration-300 ${
                      isHovered
                        ? "scale-110 z-20 shadow-2xl"
                        : "scale-100 shadow-lg"
                    }`}
                  >
                    <Image
                      src={getImagePath(movie.poster_path)}
                      alt={movie.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                    />

                    {/* Overlay on Hover */}
                    <div
                      className={`absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent transition-opacity duration-300 ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="absolute inset-0 flex flex-col justify-end p-4">
                        <div className="flex items-center gap-1.5 mb-2">
                          <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                          <span className="text-white text-sm font-bold">
                            {movie.vote_average.toFixed(1)}
                          </span>
                        </div>
                        <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">
                          {movie.title}
                        </h3>
                        <div className="flex gap-1">
                          <Button size="sm" className="h-8 px-3 text-xs">
                            <Play
                              className="h-3 w-3 mr-1"
                              fill="currentColor"
                            />
                            Play
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 bg-background/80"
                          >
                            <Info className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Rating Badge (Always Visible) */}
                    {!isHovered && (
                      <div className="absolute top-2 right-2 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        <span className="text-xs font-bold">
                          {movie.vote_average.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-primary"
                : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default InteractiveCarousel;
