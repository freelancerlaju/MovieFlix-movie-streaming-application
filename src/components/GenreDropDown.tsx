"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Genres } from "../../type";
import { useEffect, useState } from "react";

interface GenreDropDownProps {
  onGenreSelect?: () => void;
}

const GenreDropDown = ({ onGenreSelect }: GenreDropDownProps = {}) => {
  const [genres, setGenres] = useState<Genres | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("/api/genres");
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors">
        <span>Browse Genres</span>
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>Select a Genre</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[400px] overflow-y-auto">
          {loading ? (
            <DropdownMenuItem disabled>Loading genres...</DropdownMenuItem>
          ) : (
            genres?.genres?.map((genre) => (
              <DropdownMenuItem key={genre?.id} asChild>
                <Link
                  href={`/genre/${genre?.id}?genre=${genre.name}`}
                  className="cursor-pointer"
                  onClick={onGenreSelect}
                >
                  {genre?.name}
                </Link>
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GenreDropDown;
