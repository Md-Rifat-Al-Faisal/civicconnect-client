"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SafeImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  priority?: boolean;
}

export function SafeImage({
  src,
  alt,
  className,
  fallbackLabel,
}: SafeImageProps) {
  const fallbackSrc = "/images/event-placeholder.svg";
  const initialSrc = src && src.trim() ? src.trim() : fallbackSrc;

  const [imgSrc, setImgSrc] = useState(initialSrc);
  const [isLoading, setIsLoading] = useState(initialSrc !== fallbackSrc);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const nextSrc = src && src.trim() ? src.trim() : fallbackSrc;
    setImgSrc(nextSrc);
    setIsLoading(nextSrc !== fallbackSrc);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      {isLoading && (
        <div className="absolute inset-0 z-10 animate-pulse bg-muted-foreground/15" />
      )}
      <img
        src={imgSrc}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-200",
          isLoading ? "opacity-0" : "opacity-100"
        )}
      />
      {hasError && fallbackLabel && (
        <div className="absolute bottom-2 left-2 z-20 rounded-sm bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-xs">
          {fallbackLabel}
        </div>
      )}
    </div>
  );
}
