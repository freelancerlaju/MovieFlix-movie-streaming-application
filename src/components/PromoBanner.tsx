"use client";
import { Sparkles, TrendingUp, Star, Zap, Play, Film } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BackgroundGradient } from "./ui/background-gradient";

const PromoBanner = () => {
  return (
    <div className="w-full py-12 px-4 md:px-6 flex justify-center">
      <BackgroundGradient className="rounded-[28px] max-w-7xl w-full p-6 sm:p-12 bg-card shadow-2xl border border-border">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left Content */}
          <div className="flex items-start gap-6 text-center lg:text-left flex-1">
            {/* Animated Icon */}
            <div className="hidden sm:flex h-20 w-20 items-center justify-center rounded-2xl bg-primary shrink-0 shadow-lg hover:scale-110 transition-transform duration-300 group">
              <Sparkles className="h-10 w-10 text-primary-foreground group-hover:rotate-12 transition-transform duration-300" />
            </div>

            {/* Text Content */}
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2 justify-center lg:justify-start flex-wrap">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground">
                  Discover Trending Movies
                </h2>
                <Zap className="h-6 w-6 text-chart-5 fill-chart-5 animate-pulse" />
              </div>

              <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Explore the latest blockbusters, hidden gems, and award-winning
                masterpieces curated just for you. Stream in stunning quality.
              </p>

              {/* Enhanced Stats */}
              <div className="flex items-center gap-3 justify-center lg:justify-start pt-3 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold shadow-sm hover:shadow-md transition-shadow border border-primary/20">
                  <TrendingUp className="h-4 w-4" />
                  10K+ Movies
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-chart-5/10 text-chart-5 text-sm font-semibold shadow-sm hover:shadow-md transition-shadow border border-chart-5/20">
                  <Star className="h-4 w-4 fill-current" />
                  4K HD Quality
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-chart-2/10 text-chart-2 text-sm font-semibold shadow-sm hover:shadow-md transition-shadow border border-chart-2/20">
                  <Film className="h-4 w-4" />
                  New Daily
                </span>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced CTA */}
          <div className="shrink-0 flex flex-col gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-7 text-xl font-bold hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl group"
            >
              <Link href="/popular" className="flex items-center gap-3">
                <Play className="h-6 w-6 group-hover:translate-x-1 transition-transform fill-current" />
                Explore Now
              </Link>
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Free to browse • No signup required
            </p>
          </div>
        </div>
      </BackgroundGradient>
    </div>
  );
};

export default PromoBanner;
