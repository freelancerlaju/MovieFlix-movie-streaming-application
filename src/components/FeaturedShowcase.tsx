"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getImagePath } from "@/lib/getImagePath";
import { Movie } from "../../type";
import { Play, Info, Star, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface FeaturedShowcaseProps {
  movies: Movie[];
}

const FeaturedShowcase = ({ movies }: FeaturedShowcaseProps) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const featuredMovies = movies.slice(0, 6);

  return (
    <section className="container mx-auto px-4 md:px-6 py-12">
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent">
              Featured This Week
            </h2>
            <p className="text-muted-foreground mt-2">
              Hand-picked selections just for you
            </p>
          </div>
          <Button variant="ghost" className="gap-2" asChild>
            <Link href="/popular">
              View All
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Expandable Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredMovies.map((movie) => {
            const isExpanded = expandedId === movie.id;

            return (
              <div
                key={movie.id}
                className={`relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-white/10 bg-card transition-all duration-500 ease-in-out cursor-pointer group ${
                  isExpanded
                    ? "md:col-span-2 lg:col-span-2 row-span-2 z-10"
                    : "hover:scale-[1.02]"
                }`}
                onClick={() => setExpandedId(isExpanded ? null : movie.id)}
              >
                {/* Background Image */}
                <div className="relative w-full h-full min-h-[300px]">
                  <Image
                    src={getImagePath(
                      isExpanded ? movie.backdrop_path : movie.poster_path,
                      true
                    )}
                    alt={movie.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* linear Overlays */}
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute inset-0 bg-linear-to-r from-black/80 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Rating Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1.5 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full border">
                      <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm font-bold">
                        {movie.vote_average.toFixed(1)}
                      </span>
                    </div>
                    {movie.release_date && (
                      <span className="bg-primary/20 backdrop-blur-sm text-primary px-3 py-1.5 rounded-full text-xs font-semibold border border-primary/40">
                        {new Date(movie.release_date).getFullYear()}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-bold text-white mb-2 transition-all duration-300 ${
                      isExpanded ? "text-3xl md:text-4xl" : "text-xl"
                    }`}
                  >
                    {movie.title}
                  </h3>

                  {/* Expanded Content */}
                  <div
                    className={`transition-all duration-500 ${
                      isExpanded
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                  >
                    <p className="text-white/90 text-sm md:text-base mb-4 line-clamp-3">
                      {movie.overview}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" className="gap-2" asChild>
                        <Link href={`/movie/${movie.id}`}>
                          <Play className="h-4 w-4" fill="currentColor" />
                          Watch Now
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-2 bg-background/80 backdrop-blur-sm"
                        asChild
                      >
                        <Link href={`/movie/${movie.id}`}>
                          <Info className="h-4 w-4" />
                          Details
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Click to Expand Hint */}
                  {!isExpanded && (
                    <p className="text-white/60 text-xs mt-2 group-hover:text-white/80 transition-colors">
                      Click to expand
                    </p>
                  )}
                </div>

                {/* Expand Indicator */}
                <div
                  className={`absolute top-4 right-4 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 ${
                    isExpanded ? "rotate-45" : ""
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedShowcase;
