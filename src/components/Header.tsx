"use client";
import Link from "next/link";
import GenreDropDown from "./GenreDropDown";
import SearchInput from "./SearchInput";
import { ThemeToggler } from "./ThemeToggler";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import BottomHeader from "./BottomHeader";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header when at top or scrolling up
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      }
      // Hide header when scrolling down and past threshold
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`w-full sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 transition-all duration-500 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4">
            <div className="border rounded-md">
              <GenreDropDown />
            </div>
            <div className="w-80">
              <SearchInput />
            </div>
            <ThemeToggler />
          </nav>

          {/* Mobile Menu */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggler />
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle menu"
              className="hover:bg-accent rounded-full"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[350px] p-0 bg-background border-l"
              >
                <div className="flex h-full flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-5 border-b">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Menu className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold">Navigation</h2>
                        <p className="text-xs text-muted-foreground">
                          Browse movies
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Scrollable Content */}
                  <div className="flex-1 overflow-y-auto px-6 py-6">
                    <div className="space-y-6">
                      {/* Search Section */}
                      <div className="space-y-3">
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
                          Search Movies
                        </h3>
                        <SearchInput onSearch={() => setOpen(false)} />
                      </div>

                      <Separator />

                      {/* Genre Section */}
                      <div className="space-y-3">
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
                          Browse by Genre
                        </h3>
                        <GenreDropDown onGenreSelect={() => setOpen(false)} />
                      </div>

                      <Separator />

                      {/* Quick Links */}
                      <div className="space-y-3">
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
                          Quick Links
                        </h3>
                        <nav className="space-y-1">
                          <Link
                            href="/"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-all font-medium text-sm group"
                          >
                            <div className="h-2 w-2 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
                            <span className="group-hover:translate-x-0.5 transition-transform">
                              Home
                            </span>
                          </Link>
                          <Link
                            href="/playing"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-all font-medium text-sm group"
                          >
                            <div className="h-2 w-2 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
                            <span className="group-hover:translate-x-0.5 transition-transform">
                              Now Playing
                            </span>
                          </Link>
                          <Link
                            href="/upcoming"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-all font-medium text-sm group"
                          >
                            <div className="h-2 w-2 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
                            <span className="group-hover:translate-x-0.5 transition-transform">
                              Upcoming
                            </span>
                          </Link>
                          <Link
                            href="/popular"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-all font-medium text-sm group"
                          >
                            <div className="h-2 w-2 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
                            <span className="group-hover:translate-x-0.5 transition-transform">
                              Popular
                            </span>
                          </Link>
                        </nav>
                      </div>

                      <Separator />

                      {/* Info Links */}
                      <div className="space-y-3">
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
                          Information
                        </h3>
                        <nav className="space-y-1">
                          <Link
                            href="/about"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-all font-medium text-sm group"
                          >
                            <div className="h-2 w-2 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
                            <span className="group-hover:translate-x-0.5 transition-transform">
                              About Us
                            </span>
                          </Link>
                          <Link
                            href="/contact"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-all font-medium text-sm group"
                          >
                            <div className="h-2 w-2 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
                            <span className="group-hover:translate-x-0.5 transition-transform">
                              Contact
                            </span>
                          </Link>
                          <Link
                            href="/terms"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-all font-medium text-sm group"
                          >
                            <div className="h-2 w-2 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
                            <span className="group-hover:translate-x-0.5 transition-transform">
                              Terms & Conditions
                            </span>
                          </Link>
                          <Link
                            href="/privacy"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-all font-medium text-sm group"
                          >
                            <div className="h-2 w-2 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
                            <span className="group-hover:translate-x-0.5 transition-transform">
                              Privacy Policy
                            </span>
                          </Link>
                        </nav>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t px-6 py-4 bg-muted/30">
                    <p className="text-xs text-muted-foreground text-center">
                      © {new Date().getFullYear()} MovieFlix
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <BottomHeader />
    </>
  );
};

export default Header;
