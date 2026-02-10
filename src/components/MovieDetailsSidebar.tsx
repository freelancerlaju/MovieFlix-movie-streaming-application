"use client";

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getImagePath } from "@/lib/getImagePath";
import {
  Star,
  Calendar,
  Clock,
  Globe,
  X,
  Play,
  TrendingUp,
  DollarSign,
  Users,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import TrailerModal from "./TrailerModal";

interface MovieDetailsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  movieId: number;
}

const MovieDetailsSidebar = ({
  isOpen,
  onClose,
  movieId,
}: MovieDetailsSidebarProps) => {
  const [details, setDetails] = useState<any>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (isOpen && movieId) {
      setImageLoaded(false);
      fetchMovieDetails();
    }
  }, [isOpen, movieId]);

  const fetchMovieDetails = async () => {
    setLoading(true);
    try {
      const [detailsRes, videosRes] = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        ),
        fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        ),
      ]);

      const detailsData = await detailsRes.json();
      const videosData = await videosRes.json();

      setDetails(detailsData);
      setVideos(videosData.results || []);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setLoading(false);
    }
  };

  const trailer = videos.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl overflow-y-auto p-0 bg-background border-l-0 shadow-2xl"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>{details?.title || "Movie Details"}</SheetTitle>
          <SheetDescription>
            View detailed information about this movie
          </SheetDescription>
        </SheetHeader>

        {loading ? (
          <div className="flex items-center justify-center h-screen bg-linear-to-br from-background via-muted/50 to-background">
            <div className="space-y-4 text-center">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/30 border-t-primary mx-auto shadow-lg shadow-primary/30" />
                <Sparkles className="h-6 w-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse drop-shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
              </div>
              <p className="text-sm text-muted-foreground animate-pulse">
                Loading movie details...
              </p>
            </div>
          </div>
        ) : details ? (
          <div className="relative">
            {/* Hero Image Section with Parallax Effect */}
            <div className="sticky top-0 z-10">
              <div className="relative w-full h-80 overflow-hidden">
                <div
                  className={`transition-all duration-1000 ${
                    imageLoaded
                      ? "scale-100 opacity-100"
                      : "scale-110 opacity-0"
                  }`}
                >
                  <Image
                    src={getImagePath(details.backdrop_path, true)}
                    alt={details.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    onLoad={() => setImageLoaded(true)}
                    priority
                  />
                </div>
                {/* Animated linear Overlays */}
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent opacity-0 animate-[fadeIn_700ms_ease-in_forwards]" />
                <div className="absolute inset-0 bg-linear-to-r from-background/90 via-background/50 to-transparent opacity-0 animate-[fadeIn_700ms_ease-in_forwards]" />

                {/* Floating Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 rounded-full bg-background/80 hover:bg-background backdrop-blur-sm shadow-lg hover:shadow-primary/50 hover:shadow-2xl hover:scale-110 transition-all duration-300 z-20 group"
                  onClick={onClose}
                >
                  <X className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                </Button>

                {/* Poster Thumbnail - Floating */}
                <div className="absolute bottom-0 left-6 translate-y-1/3 z-10 opacity-0 animate-[slideUpFade_700ms_ease-out_300ms_forwards]">
                  <div className="relative w-32 h-48 rounded-xl overflow-hidden border-4 border-background shadow-2xl hover:scale-105 transition-transform duration-300">
                    <Image
                      src={getImagePath(details.poster_path)}
                      alt={details.title}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section with Staggered Animation */}
            <div className="px-6 pt-20 pb-8 space-y-8">
              {/* Title and Quick Info */}
              <div className="space-y-4 opacity-0 animate-[slideUpFade_700ms_ease-out_500ms_forwards]">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-linear-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent">
                      {details.title}
                    </h2>
                    {details.tagline && (
                      <p className="text-base italic text-muted-foreground mb-3">
                        &ldquo;{details.tagline}&rdquo;
                      </p>
                    )}
                  </div>
                </div>

                {/* Rating and Badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  {details.vote_average && (
                    <div className="flex items-center gap-1.5 bg-linear-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-500/40 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/50 transition-all">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 animate-pulse drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                      <span className="text-sm font-bold">
                        {details.vote_average.toFixed(1)}
                      </span>
                      {details.vote_count && (
                        <span className="text-xs text-muted-foreground">
                          ({details.vote_count.toLocaleString()} votes)
                        </span>
                      )}
                    </div>
                  )}
                  {details.status === "Released" && (
                    <span className="bg-green-500/20 text-green-600 dark:text-green-400 px-4 py-2 rounded-full text-xs font-semibold border border-green-500/40 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30 transition-all">
                      {details.status}
                    </span>
                  )}
                  {details.adult && (
                    <span className="bg-red-500/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-full text-xs font-semibold border border-red-500/40 hover:shadow-lg hover:shadow-red-500/30 transition-all">
                      18+
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 opacity-0 animate-[slideUpFade_700ms_ease-out_700ms_forwards]">
                {trailer && (
                  <TrailerModal
                    videoKey={trailer.key}
                    title={`${details.title} - Trailer`}
                    trigger={
                      <Button className="flex-1 gap-2 bg-linear-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-2xl hover:shadow-primary/50 hover:scale-105 transition-all relative overflow-hidden group">
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <Play
                          className="h-4 w-4 relative z-10"
                          fill="currentColor"
                        />
                        <span className="relative z-10">Play Trailer</span>
                      </Button>
                    }
                  />
                )}
                <Button
                  variant="outline"
                  className="flex-1 gap-2 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 hover:border-primary/50 transition-all group"
                  asChild
                >
                  <Link href={`/movie/${movieId}`}>
                    <TrendingUp className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                    Full Details
                  </Link>
                </Button>
              </div>

              {/* Meta Information Grid */}
              <div className="grid grid-cols-2 gap-4 opacity-0 animate-[slideUpFade_700ms_ease-out_900ms_forwards]">
                {details.release_date && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="p-2 rounded-full bg-primary/20">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Release Date
                      </p>
                      <p className="font-semibold">
                        {new Date(details.release_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
                {details.runtime && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="p-2 rounded-full bg-primary/20">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Runtime</p>
                      <p className="font-semibold">
                        {Math.floor(details.runtime / 60)}h{" "}
                        {details.runtime % 60}m
                      </p>
                    </div>
                  </div>
                )}
                {details.original_language && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="p-2 rounded-full bg-primary/20">
                      <Globe className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Language</p>
                      <p className="font-semibold uppercase">
                        {details.original_language}
                      </p>
                    </div>
                  </div>
                )}
                {details.popularity && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="p-2 rounded-full bg-primary/20">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Popularity
                      </p>
                      <p className="font-semibold">
                        {details.popularity.toFixed(0)}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Genres */}
              {details.genres && details.genres.length > 0 && (
                <div className="space-y-3 opacity-0 animate-[slideUpFade_700ms_ease-out_1000ms_forwards]">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Genres
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {details.genres.map((genre: any, index: number) => (
                      <Link
                        key={genre.id}
                        href={`/genre/${genre.id}`}
                        className="px-4 py-2 rounded-full bg-linear-to-r from-primary/10 to-purple-500/10 hover:from-primary/20 hover:to-purple-500/20 text-primary hover:text-foreground text-sm font-medium border border-primary/20 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/30 transition-all hover:scale-105"
                        style={{
                          animationDelay: `${1100 + index * 50}ms`,
                        }}
                      >
                        {genre.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Overview */}
              <div className="space-y-3 opacity-0 animate-[slideUpFade_700ms_ease-out_1200ms_forwards]">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Overview
                </h3>
                <p className="text-base leading-relaxed">{details.overview}</p>
              </div>

              {/* Financial Stats */}
              {(details.budget > 0 || details.revenue > 0) && (
                <div className="grid grid-cols-2 gap-4 opacity-0 animate-[slideUpFade_700ms_ease-out_1300ms_forwards]">
                  {details.budget > 0 && (
                    <div className="rounded-xl border bg-linear-to-br from-card to-muted/50 p-5 space-y-2 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 transition-all group">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <DollarSign className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xs font-medium uppercase tracking-wide">
                          Budget
                        </h3>
                      </div>
                      <p className="text-2xl font-bold">
                        ${(details.budget / 1000000).toFixed(1)}M
                      </p>
                    </div>
                  )}
                  {details.revenue > 0 && (
                    <div className="rounded-xl border bg-linear-to-br from-card to-muted/50 p-5 space-y-2 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 transition-all group">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <TrendingUp className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xs font-medium uppercase tracking-wide">
                          Revenue
                        </h3>
                      </div>
                      <p className="text-2xl font-bold">
                        ${(details.revenue / 1000000).toFixed(1)}M
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Production Companies */}
              {details.production_companies &&
                details.production_companies.length > 0 && (
                  <div className="space-y-4 opacity-0 animate-[slideUpFade_700ms_ease-out_1400ms_forwards]">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      Production Companies
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {details.production_companies
                        .slice(0, 4)
                        .map((company: any) => (
                          <div
                            key={company.id}
                            className="flex items-center justify-center p-4 rounded-xl border bg-card hover:bg-muted/50 hover:shadow-lg hover:shadow-primary/20 transition-all hover:scale-105"
                          >
                            {company.logo_path ? (
                              <div className="relative w-full h-16">
                                <Image
                                  src={getImagePath(company.logo_path)}
                                  alt={company.name}
                                  fill
                                  className="object-contain"
                                  sizes="200px"
                                />
                              </div>
                            ) : (
                              <span className="text-xs font-medium text-center">
                                {company.name}
                              </span>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
};

export default MovieDetailsSidebar;
