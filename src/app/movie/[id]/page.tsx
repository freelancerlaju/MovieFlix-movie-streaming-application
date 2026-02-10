import TrailerModal from "@/components/TrailerModal";
import VideoThumbnail from "@/components/VideoThumbnail";
import { getImagePath } from "@/lib/getImagePath";
import {
  getMovieDetails,
  getMovieVideos,
  getPopularMovies,
} from "@/lib/getMovies";
import { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play, Star, Calendar, Clock, Globe } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export const metadata: Metadata = {
  title: "Movie Studio Clone || Movie Details page",
};

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const MovieDetails = async (props: Props) => {
  const params = await props.params;
  const { id } = params;

  const movies = await getMovieVideos(id);
  const videos = movies.map((movie: any) => ({
    id: movie.id,
    iso_639_1: movie.iso_639_1,
    iso_3166_1: movie.iso_3166_1,
    key: movie.key,
    name: movie.name,
    official: movie.official,
    published_at: movie.published_at,
    site: movie.site,
    size: movie.size,
    type: movie.type,
  }));
  const details: any = await getMovieDetails(id);
  const popoularMovies = await getPopularMovies();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh]">
        <Image
          src={getImagePath(details?.backdrop_path, true)}
          alt={details?.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* linear Overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/20 to-transparent" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 md:px-6 pb-12 md:pb-16">
            <div className="max-w-3xl space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
              {/* Rating Badge */}
              <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left duration-700 delay-300">
                <div className="flex items-center gap-1.5 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full border hover:shadow-lg hover:shadow-yellow-500/30 transition-all group">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 drop-shadow-[0_0_6px_rgba(234,179,8,0.5)] group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-bold">
                    {details.vote_average.toFixed(1)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({details.vote_count.toLocaleString()} votes)
                  </span>
                </div>
                {details.status === "Released" && (
                  <span className="bg-green-500/20 text-green-600 dark:text-green-400 px-3 py-1.5 rounded-full text-xs font-semibold border border-green-500/40 hover:shadow-lg hover:shadow-green-500/30 transition-all">
                    {details.status}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-linear-to-r from-white via-white to-white/80 bg-clip-text text-transparent drop-shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                {details?.original_title}
              </h1>

              {/* Tagline */}
              {details.tagline && (
                <p className="text-lg md:text-xl italic text-white/90 drop-shadow-md animate-in fade-in duration-700 delay-700">
                  &ldquo;{details.tagline}&rdquo;
                </p>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/90 animate-in fade-in slide-in-from-bottom duration-700 delay-900">
                {details.release_date && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(details.release_date).getFullYear()}</span>
                  </div>
                )}
                {details.runtime && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>
                      {Math.floor(details.runtime / 60)}h {details.runtime % 60}
                      m
                    </span>
                  </div>
                )}
                {details.original_language && (
                  <div className="flex items-center gap-1.5">
                    <Globe className="h-4 w-4" />
                    <span className="uppercase">
                      {details.original_language}
                    </span>
                  </div>
                )}
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 animate-in fade-in duration-700 delay-1000">
                {details?.genres.map((item: any, index: number) => (
                  <span
                    key={item?.id}
                    className="px-3 py-1.5 rounded-full bg-primary/20 backdrop-blur-sm text-primary font-medium text-sm border border-primary/40 hover:bg-primary/30 hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all"
                    style={{ animationDelay: `${1100 + index * 50}ms` }}
                  >
                    {item?.name}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              {videos && videos.length > 0 && (
                <div className="pt-2 animate-in fade-in slide-in-from-bottom duration-700 delay-1200">
                  <TrailerModal
                    videoKey={videos[0].key}
                    title={`${details?.original_title} - Trailer`}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-12 space-y-12">
        {/* Overview Section */}
        <div className="max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Overview</h2>
          <div className="bg-card relative group hover:shadow-2xl hover:shadow-primary/20 border-primary/30 hover:border-primary/50 w-full rounded-xl p-6 md:p-8 border-2 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <p className="text-base md:text-lg text-card-foreground leading-relaxed relative z-10">
              {details?.overview}
            </p>
          </div>
        </div>

        {/* Additional Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Budget Card */}
          {details.budget > 0 && (
            <div className="rounded-xl border-2 border-primary/30 hover:border-primary/60 bg-gradient-to-br from-card to-primary/5 p-4 space-y-1.5 hover:shadow-xl hover:shadow-primary/20 transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors" />
              <h3 className="text-xs font-semibold text-primary uppercase tracking-wide flex items-center gap-1.5 relative z-10">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Budget
              </h3>
              <p className="text-2xl md:text-3xl font-bold text-foreground relative z-10">
                ${(details.budget / 1000000).toFixed(1)}M
              </p>
            </div>
          )}

          {/* Revenue Card */}
          {details.revenue > 0 && (
            <div className="rounded-xl border-2 border-green-500/30 hover:border-green-500/60 bg-gradient-to-br from-card to-green-500/5 p-4 space-y-1.5 hover:shadow-xl hover:shadow-green-500/20 transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-colors" />
              <h3 className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide flex items-center gap-1.5 relative z-10">
                <span className="w-1.5 h-1.5 bg-green-600 dark:bg-green-400 rounded-full" />
                Revenue
              </h3>
              <p className="text-2xl md:text-3xl font-bold text-foreground relative z-10">
                ${(details.revenue / 1000000).toFixed(1)}M
              </p>
            </div>
          )}

          {/* Popularity Card */}
          {details.popularity && (
            <div className="rounded-xl border-2 border-purple-500/30 hover:border-purple-500/60 bg-gradient-to-br from-card to-purple-500/5 p-4 space-y-1.5 hover:shadow-xl hover:shadow-purple-500/20 transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-colors" />
              <h3 className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide flex items-center gap-1.5 relative z-10">
                <span className="w-1.5 h-1.5 bg-purple-600 dark:bg-purple-400 rounded-full" />
                Popularity
              </h3>
              <p className="text-2xl md:text-3xl font-bold text-foreground relative z-10">
                {details.popularity.toFixed(0)}
              </p>
            </div>
          )}
        </div>

        {/* Production Companies */}
        {details.production_companies &&
          details.production_companies.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl md:text-3xl font-bold">
                  Production Companies
                </h2>
                <span className="text-sm text-muted-foreground">
                  {details.production_companies.length}{" "}
                  {details.production_companies.length === 1
                    ? "company"
                    : "companies"}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {details.production_companies.map((company: any) => (
                  <CardContainer key={company.id} className="inter-var w-full">
                    <CardBody className="bg-card border-2 border-border hover:border-primary/40 rounded-xl p-4 hover:shadow-lg hover:shadow-primary/10 transition-all group/card relative overflow-hidden h-24 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover/card:opacity-100 transition-opacity" />
                      <CardItem
                        translateZ="50"
                        className="relative z-10 w-full h-full flex items-center justify-center"
                      >
                        {company.logo_path ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={getImagePath(company.logo_path)}
                              alt={company.name}
                              fill
                              className="object-contain group-hover/card:scale-105 transition-transform duration-300"
                              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                            />
                          </div>
                        ) : (
                          <span className="text-xs font-semibold text-center text-card-foreground group-hover/card:text-primary transition-colors">
                            {company.name}
                          </span>
                        )}
                      </CardItem>
                    </CardBody>
                  </CardContainer>
                ))}
              </div>
            </div>
          )}

        {/* Video Section */}
        {videos && videos.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-bold">
                Official Videos
              </h2>
              <span className="text-sm text-muted-foreground">
                {videos.length} {videos.length === 1 ? "video" : "videos"}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video: any, index: number) => (
                <TrailerModal
                  key={video.id}
                  videoKey={video.key}
                  title={video.name}
                  trigger={
                    <div className="cursor-pointer">
                      <CardContainer className="inter-var w-full">
                        <CardBody className="bg-card relative group/card hover:shadow-2xl hover:shadow-primary/20 border-border w-full h-full rounded-xl overflow-hidden border transition-all duration-300">
                          {/* Thumbnail */}
                          <CardItem translateZ="50" className="w-full">
                            <div className="relative aspect-video w-full bg-muted overflow-hidden">
                              <VideoThumbnail
                                videoKey={video.key}
                                alt={video.name}
                              />
                              {/* Gradient Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                              <div className="absolute inset-0 bg-black/20 group-hover/card:bg-black/40 transition-colors duration-300" />

                              {/* Play Button Overlay */}
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                                <div className="bg-primary rounded-full p-5 shadow-2xl shadow-primary/50 group-hover/card:scale-110 transition-transform duration-300">
                                  <Play
                                    className="h-10 w-10 text-primary-foreground ml-1"
                                    fill="currentColor"
                                  />
                                </div>
                              </div>

                              {/* Video Type Badge */}
                              <div className="absolute top-3 left-3 flex items-center gap-2">
                                <span className="px-3 py-1.5 rounded-full bg-background/95 backdrop-blur-sm text-foreground text-xs font-semibold border border-border shadow-lg">
                                  {video.type}
                                </span>
                                {video.official && (
                                  <span className="px-3 py-1.5 rounded-full bg-green-500 text-white text-xs font-semibold shadow-lg flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                    Official
                                  </span>
                                )}
                              </div>

                              {/* Duration Badge (if available) */}
                              <div className="absolute bottom-3 right-3">
                                <span className="px-2 py-1 rounded bg-black/90 backdrop-blur-sm text-white text-xs font-medium">
                                  {video.site === "YouTube"
                                    ? "YouTube"
                                    : video.site}
                                </span>
                              </div>
                            </div>
                          </CardItem>

                          {/* Video Info */}
                          <div className="p-4 space-y-2 bg-gradient-to-b from-card to-muted/30">
                            <CardItem
                              translateZ="60"
                              className="font-bold text-base line-clamp-2 text-card-foreground group-hover/card:text-primary transition-colors leading-tight"
                            >
                              {video.name}
                            </CardItem>

                            {video.published_at && (
                              <CardItem
                                translateZ="40"
                                className="text-xs text-muted-foreground flex items-center gap-1.5"
                              >
                                <Calendar className="h-3 w-3" />
                                {new Date(
                                  video.published_at
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </CardItem>
                            )}

                            {/* Watch Now Label */}
                            <CardItem
                              translateZ="40"
                              className="flex items-center gap-2 text-xs font-medium text-primary pt-1 opacity-0 group-hover/card:opacity-100 transition-opacity"
                            >
                              <Play className="h-3 w-3" fill="currentColor" />
                              <span>Click to watch</span>
                            </CardItem>
                          </div>
                        </CardBody>
                      </CardContainer>
                    </div>
                  }
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related Movies Section */}
      <div className="border-t border-border bg-muted/20">
        <div className="container mx-auto px-4 md:px-6 py-12 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold">
              You May Also Like
            </h2>
            <Button variant="outline" asChild>
              <a href="/">View All</a>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {popoularMovies?.slice(0, 12).map((movie: any) => (
              <a
                key={movie.id}
                href={`/movie/${movie.id}`}
                className="block h-full"
              >
                <CardContainer className="inter-var h-full w-full">
                  <CardBody className="bg-card relative group/card dark:hover:shadow-2xl dark:hover:shadow-primary/[0.1] border-border w-full h-full rounded-xl p-3 border transition-all duration-300 flex flex-col">
                    {/* Movie Poster */}
                    <CardItem translateZ="50" className="w-full">
                      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={getImagePath(
                            movie.poster_path || movie.backdrop_path
                          )}
                          alt={movie.title}
                          fill
                          className="object-cover group-hover/card:shadow-xl"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                        />
                        {/* Rating Badge */}
                        {movie.vote_average > 0 && (
                          <div className="absolute top-2 right-2 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full border">
                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                            <span className="text-xs font-semibold">
                              {movie.vote_average.toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardItem>

                    {/* Movie Info */}
                    <div className="pt-3 space-y-1 flex-1">
                      <CardItem
                        translateZ="60"
                        className="font-semibold text-sm line-clamp-2 text-card-foreground group-hover/card:text-primary transition-colors"
                      >
                        {movie.title}
                      </CardItem>

                      {movie.release_date && (
                        <CardItem
                          translateZ="40"
                          className="text-xs text-muted-foreground"
                        >
                          {new Date(movie.release_date).getFullYear()}
                        </CardItem>
                      )}
                    </div>
                  </CardBody>
                </CardContainer>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
