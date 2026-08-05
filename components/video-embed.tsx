"use client";

import { useState } from "react";
import { cn } from "@/components/ui/cn";

type VideoEmbedProps = {
  /** YouTube video ID. */
  id: string;
  /** Accessible title — also the visible caption when `showTitle` is set. */
  title: string;
  /** Shot vertically (9:16). Shorts and most ad creative are. */
  vertical?: boolean;
  /** Render the title under the player. */
  showTitle?: boolean;
  className?: string;
};

/**
 * A click-to-play YouTube facade.
 *
 * Nothing from YouTube loads until the visitor actually presses play — no
 * iframe, no ~1MB of player JavaScript, no cookies. A page like the homepage
 * carries six of these; embedding six real iframes would cost several megabytes
 * and wreck Largest Contentful Paint on exactly the pages that need to convert.
 *
 * Once played it swaps in the `youtube-nocookie` player, which is the same
 * playback experience without the tracking cookie on first paint.
 */
export function VideoEmbed({
  id,
  title,
  vertical = false,
  showTitle = false,
  className,
}: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);

  // maxres does not exist for every upload; hq always does.
  const [thumb, setThumb] = useState(
    `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
  );

  return (
    <figure className={cn("group", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border border-line bg-raised shadow-lift",
          vertical ? "aspect-[9/16]" : "aspect-video",
        )}
      >
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 h-full w-full cursor-pointer"
          >
            <span className="sr-only">Play video: {title}</span>
            <img
              src={thumb}
              alt=""
              loading="lazy"
              decoding="async"
              onError={() =>
                setThumb(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)
              }
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />

            {/* Keeps the play control readable over a bright frame. */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-canvas/80 via-canvas/10 to-transparent"
            />

            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand shadow-brand transition-transform duration-300 group-hover:scale-110"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="ml-1 h-7 w-7 text-white"
              >
                <path d="M8 5.14v13.72a.5.5 0 0 0 .77.42l10.7-6.86a.5.5 0 0 0 0-.84L8.77 4.72A.5.5 0 0 0 8 5.14Z" />
              </svg>
            </span>
          </button>
        )}
      </div>

      {showTitle && (
        <figcaption className="mt-3 text-small text-muted">{title}</figcaption>
      )}
    </figure>
  );
}
