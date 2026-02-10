"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Send,
  Heart,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useTheme } from "next-themes";
import Logo from "./Logo";

const infoArray = [
  {
    title: "About us",
    href: "/about",
  },
  {
    title: "Contact us",
    href: "/contact",
  },
  {
    title: "Terms & Conditions",
    href: "/terms",
  },
  {
    title: "Privacy Policy",
    href: "/privacy",
  },
];

const contactArray = [
  {
    title: "Now Playing",
    href: "/playing",
  },
  {
    title: "Upcoming",
    href: "/upcoming",
  },
  {
    title: "Top Rated",
    href: "/top-rated",
  },
  {
    title: "Popular",
    href: "/popular",
  },
];

const genreLinks = [
  { title: "Action", href: "/genre/28" },
  { title: "Comedy", href: "/genre/35" },
  { title: "Drama", href: "/genre/18" },
  { title: "Horror", href: "/genre/27" },
  { title: "Sci-Fi", href: "/genre/878" },
  { title: "Romance", href: "/genre/10749" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const Information = ({ contact }: { contact?: boolean }) => {
  return (
    <div className="flex flex-col gap-2">
      {contact
        ? contactArray.map((item) => (
            <Link
              href={item?.href}
              key={item?.title}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-all group-hover:scale-125" />
              {item?.title}
            </Link>
          ))
        : infoArray.map((item) => (
            <Link
              href={item?.href}
              key={item?.title}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-all group-hover:scale-125" />
              {item?.title}
            </Link>
          ))}
    </div>
  );
};

const Footer = () => {
  const [email, setEmail] = useState("");
  const { theme } = useTheme();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribe:", email);
    setEmail("");
  };

  return (
    <footer className="relative border-t bg-background/90 backdrop-blur-sm overflow-hidden">
      {/* Decorative linear */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-10">
          {/* About Section - Spans 3 columns on large screens */}
          <div className="lg:col-span-3 space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your ultimate destination for discovering the latest movies,
              blockbusters, and hidden gems from around the world. Experience
              cinema like never before.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex items-center justify-center h-9 w-9 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground transition-all hover:scale-110"
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Information Section */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold tracking-tight flex items-center gap-2 text-foreground">
              Company
            </h3>
            <Information />
          </div>

          {/* Category Section */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold tracking-tight text-foreground">
              Movies
            </h3>
            <Information contact={true} />
          </div>

          {/* Genres Section */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold tracking-tight text-foreground">
              Genres
            </h3>
            <div className="flex flex-col gap-2">
              {genreLinks.map((genre) => (
                <Link
                  key={genre.title}
                  href={genre.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-all group-hover:scale-125" />
                  {genre.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter Section - Spans 3 columns */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-lg font-bold tracking-tight text-foreground">
              Newsletter
            </h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to get updates on new releases, exclusive content, and
              special offers.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-background/50 border-border/50 focus:border-primary"
                  required
                />
                <Button
                  type="submit"
                  size="icon"
                  className="shrink-0 hover:scale-105 transition-transform"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </form>

            {/* Contact Info */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-3.5 w-3.5 text-primary" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-3.5 w-3.5 text-primary" />
                <a
                  href="mailto:contact@moviestudio.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  contact@moviestudio.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left flex items-center gap-1.5">
              © {new Date().getFullYear()} Movie Studio. Made with
              <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500 animate-pulse" />
              by developers
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
