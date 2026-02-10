"use client";

import { useState } from "react";

interface VideoThumbnailProps {
  videoKey: string;
  alt: string;
}

const VideoThumbnail = ({ videoKey, alt }: VideoThumbnailProps) => {
  const [imgSrc, setImgSrc] = useState(
    `https://img.youtube.com/vi/${videoKey}/maxresdefault.jpg`
  );

  return (
    <img
      src={imgSrc}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      onError={() => {
        setImgSrc(`https://img.youtube.com/vi/${videoKey}/hqdefault.jpg`);
      }}
    />
  );
};

export default VideoThumbnail;
