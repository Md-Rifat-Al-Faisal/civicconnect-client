"use client";

import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string | null;
  name?: string | null;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function UserAvatar({
  src,
  name,
  className,
  size = "md",
}: UserAvatarProps) {
  const cleanSrc = src && typeof src === "string" ? src.trim() : "";
  const isValidUrl = cleanSrc.startsWith("http://") || cleanSrc.startsWith("https://");

  const [hasError, setHasError] = useState(!isValidUrl);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!cleanSrc || !isValidUrl) {
      setHasError(true);
      setIsLoaded(false);
      return;
    }

    setHasError(false);
    setIsLoaded(false);

    let active = true;
    const img = new Image();

    const timer = setTimeout(() => {
      if (active && !isLoaded) {
        setHasError(true);
      }
    }, 2000);

    img.onload = () => {
      if (active) {
        clearTimeout(timer);
        setIsLoaded(true);
      }
    };

    img.onerror = () => {
      if (active) {
        clearTimeout(timer);
        setHasError(true);
      }
    };

    img.src = cleanSrc;

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [cleanSrc, isValidUrl]);

  const initial = name && name.trim() ? name.trim().charAt(0).toUpperCase() : "";

  const sizeClasses = {
    sm: "size-8 text-xs",
    md: "size-9 text-sm",
    lg: "size-12 text-base",
    xl: "size-24 text-3xl",
  };

  const iconSizes = {
    sm: "size-4",
    md: "size-4.5",
    lg: "size-6",
    xl: "size-10",
  };

  if (!isValidUrl || hasError) {
    return (
      <div
        title={name || "User"}
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary via-[#1e4238] to-[#122822] font-extrabold text-primary-foreground shadow-xs select-none border border-primary/20",
          sizeClasses[size],
          className
        )}
      >
        {initial ? initial : <User className={iconSizes[size]} />}
      </div>
    );
  }

  return (
    <div
      title={name || "User"}
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted border border-border shadow-xs",
        sizeClasses[size],
        className
      )}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary via-[#1e4238] to-[#122822] font-extrabold text-primary-foreground">
          {initial ? initial : <User className={iconSizes[size]} />}
        </div>
      )}
      <img
        src={cleanSrc}
        alt={name || "User avatar"}
        loading="eager"
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={cn(
          "size-full object-cover transition-opacity duration-150",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}
