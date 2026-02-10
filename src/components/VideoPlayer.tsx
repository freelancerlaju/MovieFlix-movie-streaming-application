"use client";
import { Videos } from "../../type";
import YouTube, { YouTubeProps } from "react-youtube";

const VideoPlayer = ({ videos }: Videos) => {
  const onPlayerReady: YouTubeProps["onReady"] = (event: any) => {
    event.target.pauseVideo();
  };
  const opts = {
    height: "300px",
    width: "100%",
  };
  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold">Official Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video?.id}
            className="border border-border rounded-lg overflow-hidden bg-card shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="px-4 py-3 bg-muted/50 border-b border-border">
              <p className="text-sm font-medium text-foreground">
                {video?.type} {video?.official && "• Official"}
              </p>
            </div>
            <div className="aspect-video">
              <YouTube
                videoId={video?.key}
                onReady={onPlayerReady}
                opts={opts}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;
