"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getImagePath } from "@/lib/getImagePath";
import { Movie } from "../../type";
import { Flame, TrendingUp, Star } from "lucide-react";

interface TrendingSpotlightProps {
  movies: Movie[];
}

const TrendingSpotlight = ({ movies }: TrendingSpotlightProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trendingMovies = movies.slice(0, 5);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % trendingMovies.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, trendingMovies.length]);

  return (
    <section className="container mx-auto px-4 md:px-6 py-12">
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-linear-to-r from-orange-500 to-red-500 px-4 py-2 rounded-full">
            <Flame className="h-5 w-5 text-white animate-pulse" />
            <span className="text-white font-bold text-sm">TRENDING NOW</span>
          </div>
          <TrendingUp className="h-5 w-5 text-orange-500 animate-bounce" />
        </div>

        {/* Main Spotlight */}
        <div
          className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Background Images with Transition */}
          {trendingMovies.map((movie, index) => (
            <div
              key={movie.id}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === activeIndex
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-110"
              }`}
            >
              <Image
                src={getImagePath(movie.backdrop_path, true)}
                alt={movie.title}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
              />
              {/* linear Overlays */}
              <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
              <div className="absolute inset-0 bg-linear-to-r from-background via-background/40 to-transparent" />
            </div>
          ))}

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
            <div className="max-w-2xl space-y-4">
              {/* Ranking Badge */}
              <div className="flex items-center gap-3">
                <div className="text-8xl md:text-9xl font-black text-white/10 leading-none">
                  #{activeIndex + 1}
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  <span className="text-white font-bold text-lg">
                    {trendingMovies[activeIndex].vote_average.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Title with Animation */}
              <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-2xl animate-in slide-in-from-bottom duration-700">
                {trendingMovies[activeIndex].title}
              </h2>

              {/* Overview */}
              <p className="text-white/90 text-base md:text-lg line-clamp-3 animate-in slide-in-from-bottom duration-700 delay-150">
                {trendingMovies[activeIndex].overview}
              </p>

              {/* CTA Button */}
              <Link
                href={`/movie/${trendingMovies[activeIndex].id}`}
                className="inline-flex items-center gap-2 bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-full font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-xl animate-in slide-in-from-bottom duration-700 delay-300"
              >
                <Flame className="h-5 w-5" />
                Watch Now
              </Link>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            {trendingMovies.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-12 bg-linear-to-r from-orange-500 to-red-500"
                    : "w-2 bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="grid grid-cols-5 gap-3">
          {trendingMovies.map((movie, index) => (
            <button
              key={movie.id}
              onClick={() => setActiveIndex(index)}
              className={`relative aspect-video rounded-lg overflow-hidden transition-all duration-300 ${
                index === activeIndex
                  ? "ring-4 ring-orange-500 scale-105"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={getImagePath(movie.backdrop_path, true)}
                alt={movie.title}
                fill
                className="object-cover"
                sizes="20vw"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  #{index + 1}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSpotlight;
