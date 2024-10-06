"use client";
import React from "react";
import ReactPlayer from "react-player/lazy";

export function Video({ src, className }: { src: string; className?: string }) {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    isReady && (
      <ReactPlayer
        url={src}
        controls={true}
        className={className}
        width="100%"
      />
    )
  );
}
