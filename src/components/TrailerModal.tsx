"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, X } from "lucide-react";

interface TrailerModalProps {
  videoKey: string;
  title: string;
  trigger?: React.ReactNode;
}

const TrailerModal = ({ videoKey, title, trigger }: TrailerModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger ? (
        <div onClick={() => setIsOpen(true)}>{trigger}</div>
      ) : (
        <Button size="lg" className="gap-2" onClick={() => setIsOpen(true)}>
          <Play className="h-5 w-5" fill="currentColor" />
          Watch Trailer
        </Button>
      )}

      <DialogContent className="max-w-5xl w-full p-0 overflow-hidden bg-background border-none">
        <DialogHeader className="absolute top-0 right-0 z-50 p-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-background/80 hover:bg-background"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </DialogHeader>

        <div className="relative w-full aspect-video bg-black">
          {isOpen && (
            <iframe
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TrailerModal;
