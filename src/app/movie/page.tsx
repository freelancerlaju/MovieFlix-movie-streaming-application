import {
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
} from "@/lib/getMovies";
import Image from "next/image";
import { getImagePath } from "@/lib/getImagePath";
import Link from "next/link";
import {
  Star,
  Calendar,
  TrendingUp,
  Award,
  Play as PlayIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata = {
  title: "All Movies - Movie Studio",
  description:
    "Browse all movies including popular, top rated, and now playing",
};

const MoviesPage = async () => {
  const popularMovies = await getPopularMovies();
  const topRatedMovies = await getTopRatedMovies();
  const nowPlayingMovies = await getNowPlayingMovies();

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <PlayIcon className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                All Movies
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Discover thousands of movies across different categories
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <Tabs defaultValue="popular" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="popular" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Popular
            </TabsTrigger>
            <TabsTrigger value="top-rated" className="gap-2">
              <Award className="h-4 w-4" />
              Top Rated
            </TabsTrigger>
            <TabsTrigger value="now-playing" className="gap-2">
              <PlayIcon className="h-4 w-4" />
              Now Playing
            </TabsTrigger>
          </TabsList>

          {/* Popular Movies */}
          <TabsContent value="popular" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-bold">Popular Movies</h2>
              <p className="text-sm text-muted-foreground">
                {popularMovies?.length || 0} movies
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {popularMovies?.map((movie: any) => (
                <Link
                  key={movie.id}
                  href={`/movie/${movie.id}`}
                  className="group relative overflow-hidden rounded-lg border bg-card shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-2/3 w-full overflow-hidden bg-muted">
                    <Image
                      src={getImagePath(
                        movie.poster_path || movie.backdrop_path
                      )}
                      alt={movie.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {movie.vote_average > 0 && (
                      <div className="absolute top-2 right-2 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full border">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        <span className="text-xs font-semibold">
                          {movie.vote_average.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-3 space-y-1">
                    <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {movie.title}
                    </h3>
                    {movie.release_date && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(movie.release_date).getFullYear()}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>

          {/* Top Rated Movies */}
          <TabsContent value="top-rated" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-bold">
                Top Rated Movies
              </h2>
              <p className="text-sm text-muted-foreground">
                {topRatedMovies?.length || 0} movies
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {topRatedMovies?.map((movie: any) => (
                <Link
                  key={movie.id}
                  href={`/movie/${movie.id}`}
                  className="group relative overflow-hidden rounded-lg border bg-card shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-2/3 w-full overflow-hidden bg-muted">
                    <Image
                      src={getImagePath(
                        movie.poster_path || movie.backdrop_path
                      )}
                      alt={movie.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {movie.vote_average > 0 && (
                      <div className="absolute top-2 right-2 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full border">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        <span className="text-xs font-semibold">
                          {movie.vote_average.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-3 space-y-1">
                    <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {movie.title}
                    </h3>
                    {movie.release_date && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(movie.release_date).getFullYear()}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>

          {/* Now Playing Movies */}
          <TabsContent value="now-playing" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-bold">Now Playing</h2>
              <p className="text-sm text-muted-foreground">
                {nowPlayingMovies?.length || 0} movies
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {nowPlayingMovies?.map((movie: any) => (
                <Link
                  key={movie.id}
                  href={`/movie/${movie.id}`}
                  className="group relative overflow-hidden rounded-lg border bg-card shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-2/3 w-full overflow-hidden bg-muted">
                    <Image
                      src={getImagePath(
                        movie.poster_path || movie.backdrop_path
                      )}
                      alt={movie.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {movie.vote_average > 0 && (
                      <div className="absolute top-2 right-2 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full border">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        <span className="text-xs font-semibold">
                          {movie.vote_average.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-3 space-y-1">
                    <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {movie.title}
                    </h3>
                    {movie.release_date && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(movie.release_date).getFullYear()}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default MoviesPage;
