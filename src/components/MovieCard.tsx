"use client";
import { Movie } from "../../type";
import Image from "next/image";
import { getImagePath } from "@/lib/getImagePath";
import Link from "next/link";
import { Star, Calendar } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Link
      href={`/movie/${movie?.id}`}
      className="block h-full w-[280px] md:w-[320px] shrink-0 transform transition-transform duration-300 hover:scale-[1.02]"
    >
      <CardContainer className="inter-var h-full w-full">
        <CardBody className="bg-card relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10 dark:bg-black dark:border-white/20 border-black/10 w-full h-full rounded-xl p-4 border transition-all duration-300 flex flex-col">
          <CardItem translateZ="50" className="w-full mt-2">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={getImagePath(movie?.backdrop_path || movie?.poster_path)}
                alt={movie?.title}
                fill
                className="object-cover group-hover/card:shadow-xl"
                sizes="(max-width: 768px) 280px, 320px"
              />
              {/* linear Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
            </div>
          </CardItem>

          <div className="flex flex-col flex-1 mt-6">
            <div className="flex justify-between items-start mb-2">
              <CardItem
                translateZ="60"
                className="text-lg font-bold text-neutral-600 dark:text-white line-clamp-1"
              >
                {movie?.title}
              </CardItem>
              {movie?.vote_average > 0 && (
                <CardItem
                  translateZ="60"
                  className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-2 py-1 rounded-full shrink-0 ml-2"
                >
                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  <span className="text-xs font-bold text-white">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </CardItem>
              )}
            </div>

            <CardItem
              as="p"
              translateZ="40"
              className="text-neutral-500 text-sm max-w-sm dark:text-neutral-300 line-clamp-3 mb-4"
            >
              {movie?.overview || "No description available."}
            </CardItem>
          </div>

          <div className="flex flex-col justify-between gap-3 mt-auto">
            {movie?.release_date && (
              <CardItem
                translateZ="30"
                className="flex items-center gap-1.5 text-xs text-neutral-400"
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </CardItem>
            )}
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 w-full rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              Watch Now
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </Link>
  );
};

export default MovieCard;
