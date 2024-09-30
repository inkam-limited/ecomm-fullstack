"use client";
import React from "react";
import ReactPlayer from "react-player/lazy";

export function Video({ src }: { src: string }) {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    isReady && (
      <ReactPlayer
        url={src}
        controls={true}
        className=" md:basis-2/3 w-full lg:basis-1/2"
      />
    )
  );
}
