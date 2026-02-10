import { getPopularMovies } from "@/lib/getMovies";
import Image from "next/image";
import { getImagePath } from "@/lib/getImagePath";
import { Film, Sparkles, Star, TrendingUp } from "lucide-react";
import InfiniteMovieGrid from "@/components/InfiniteMovieGrid";
import { Movie } from "../../../type";

export const metadata = {
  title: "Popular Movies - Movie Studio",
  description: "The most popular movies loved by audiences worldwide",
};

export default async function PopularPage() {
  const movies = await getPopularMovies(1);
  const featuredMovie = movies?.[0];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        {featuredMovie?.backdrop_path ? (
          <>
            <Image
              src={getImagePath(featuredMovie.backdrop_path, true)}
              alt="Popular movies"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-background/40" />
            <div className="absolute inset-0 bg-linear-to-r from-background via-background/50 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-background to-background" />
        )}

        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 md:px-6 pb-12 md:pb-16">
            <div className="max-w-4xl space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/40">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground uppercase tracking-wide">
                    Popular
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-full border">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-bold text-foreground">
                    {movies?.length || 0} Movies
                  </span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white drop-shadow-2xl">
                Popular Movies
              </h1>

              <p className="text-base md:text-lg lg:text-xl text-white/90 drop-shadow-lg max-w-2xl">
                Explore the most popular movies loved by audiences worldwide.
                From box office hits to fan favorites.
              </p>

              {featuredMovie && (
                <div className="flex items-center gap-4 text-sm text-white/80 pt-2">
                  <span className="font-medium">Featured:</span>
                  <span className="font-semibold text-white">
                    {featuredMovie.title}
                  </span>
                  {featuredMovie.vote_average > 0 && (
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                      <span className="font-bold">
                        {featuredMovie.vote_average.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Movies Grid with Infinite Scroll */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <InfiniteMovieGrid
          initialMovies={movies}
          endpoint="/api/movies/popular"
        />
      </div>
    </main>
  );
}
