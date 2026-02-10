import { getDiscoverMovies } from "@/lib/getMovies";
import Image from "next/image";
import { getImagePath } from "@/lib/getImagePath";
import Link from "next/link";
import { Calendar, Star, Film, Sparkles } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

interface Props {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    genre: string;
  }>;
}

const GenrePage = async (props: Props) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { id } = params;
  const { genre } = searchParams;

  const movies = await getDiscoverMovies(id);
  const featuredMovie = movies?.[0]; // Use first movie for banner

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Banner with Movie Backdrop */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        {featuredMovie?.backdrop_path ? (
          <>
            <Image
              src={getImagePath(featuredMovie.backdrop_path, true)}
              alt={`${genre} movies`}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            {/* linear Overlays */}
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-background/40" />
            <div className="absolute inset-0 bg-linear-to-r from-background via-background/50 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-background to-background" />
        )}

        {/* Banner Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 md:px-6 pb-12 md:pb-16">
            <div className="max-w-4xl space-y-4">
              {/* Genre Badge */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/40">
                  <Film className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground uppercase tracking-wide">
                    {genre} Genre
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-full border">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-bold text-foreground">
                    {movies?.length || 0} Movies
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white drop-shadow-2xl">
                {genre} Movies
              </h1>

              {/* Description */}
              <p className="text-base md:text-lg lg:text-xl text-white/90 drop-shadow-lg max-w-2xl">
                Explore our curated collection of {movies?.length || 0} amazing{" "}
                {genre?.toLowerCase()} movies. From classics to modern
                masterpieces, discover your next favorite film.
              </p>

              {/* Featured Movie Info */}
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

      {/* Movies Grid */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        {movies && movies.length > 0 ? (
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
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              No movies found in this genre.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default GenrePage;
