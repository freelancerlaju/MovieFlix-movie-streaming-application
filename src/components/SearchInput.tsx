"use client";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchInputProps {
  onSearch?: () => void;
}

const SearchInput = ({ onSearch }: SearchInputProps = {}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/search");
    if (onSearch) {
      onSearch();
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      className="w-full justify-start text-muted-foreground hover:text-foreground h-10 px-4"
    >
      <Search className="mr-2 h-4 w-4" />
      Search movies...
    </Button>
  );
};

export default SearchInput;
