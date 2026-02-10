"use client";

import Image from "next/image";
import Link from "next/link";
import { getImagePath } from "@/lib/getImagePath";
import { Movie } from "../../type";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface GenreSpotlightProps {
  title: string;
  description: string;
  movies: Movie[];
  genreId?: number;
}

const GenreSpotlight = ({
  title,
  description,
  movies,
  genreId,
}: GenreSpotlightProps) => {
  const spotlightMovies = movies.slice(0, 4);
  const mainMovie = spotlightMovies[0];
  const sideMovies = spotlightMovies.slice(1, 4);

  return (
    <section className="container mx-auto px-4 md:px-6 py-12">
      <div className="rounded-3xl overflow-hidden bg-linear-to-br from-primary/10 via-purple-500/10 to-primary/10 p-6 md:p-8 border border-primary/20">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
            </div>
            <p className="text-muted-foreground">{description}</p>
          </div>
          {genreId && (
            <Button variant="ghost" className="gap-2" asChild>
              <Link href={`/genre/${genreId}`}>
                Explore
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Main Featured Movie */}
          <Link
            href={`/movie/${mainMovie.id}`}
            className="md:col-span-2 md:row-span-2 group relative rounded-2xl overflow-hidden"
          >
            <div className="relative aspect-video md:aspect-[16/9] w-full">
              <Image
                src={getImagePath(mainMovie.backdrop_path, true)}
                alt={mainMovie.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              {/* linear Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="inline-flex items-center gap-1 bg-primary/20 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-xs font-semibold border border-primary/40 w-fit mb-3">
                  <Sparkles className="h-3 w-3" />
                  Featured
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {mainMovie.title}
                </h3>
                <p className="text-white/80 text-sm line-clamp-2 mb-4">
                  {mainMovie.overview}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-white/60 text-xs">
                    {mainMovie.release_date &&
                      new Date(mainMovie.release_date).getFullYear()}
                  </span>
                  <span className="text-white/60">•</span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500 text-xs">★</span>
                    <span className="text-white text-xs font-semibold">
                      {mainMovie.vote_average.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </Link>

          {/* Side Movies */}
          {sideMovies.map((movie, index) => (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="group relative rounded-xl overflow-hidden"
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={getImagePath(movie.backdrop_path, true)}
                  alt={movie.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* linear Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl font-black text-white/20">
                      #{index + 2}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500 text-xs">★</span>
                      <span className="text-white text-xs font-semibold">
                        {movie.vote_average.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-white font-semibold text-sm line-clamp-2">
                    {movie.title}
                  </h3>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GenreSpotlight;
