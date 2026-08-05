import type { Video } from "@/content/videos";
import { VideoEmbed } from "@/components/video-embed";
import { cn } from "@/components/ui/cn";
import {
  attributionInitials,
  attributionLine,
  hasAttribution,
  testimonialAttribution,
  type Attribution,
} from "@/components/work/attribution";

/**
 * Anchor id for a testimonial, so the proof strip can point at the video the
 * number came from. Shared with `ProofStrip` through this one helper.
 */
export function testimonialAnchor(id: string): string {
  return `testimonial-${id}`;
}

function Monogram({ attribution }: { attribution: Attribution | undefined }) {
  const initials = attributionInitials(attribution);

  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border",
        initials
          ? "border-accent-dim/50 bg-brand/20 font-mono text-micro tracking-widest text-accent"
          : "border-line bg-raised text-faint",
      )}
    >
      {initials || (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M9.6 6.2c-2.9 1.2-4.6 3.7-4.6 6.6 0 2.9 1.7 4.9 4.1 4.9 2 0 3.5-1.4 3.5-3.3 0-1.9-1.3-3.2-3.1-3.2-.4 0-.7 0-1 .1.4-1.4 1.5-2.6 3-3.3ZM19 6.2c-2.9 1.2-4.6 3.7-4.6 6.6 0 2.9 1.7 4.9 4.1 4.9 2 0 3.5-1.4 3.5-3.3 0-1.9-1.3-3.2-3.1-3.2-.4 0-.7 0-1 .1.4-1.4 1.5-2.6 3-3.3Z" />
        </svg>
      )}
    </span>
  );
}

function TestimonialCard({ video }: { video: Video }) {
  const attribution = testimonialAttribution[video.id];
  const named = hasAttribution(attribution);

  return (
    <article id={testimonialAnchor(video.id)} className="scroll-mt-28">
      <VideoEmbed id={video.id} title={video.title} vertical={video.vertical} />

      {/*
       * Fixed minimum height so an attribution landing later pushes nothing
       * around: the named and unnamed states occupy the same box.
       */}
      <div className="mt-5 flex min-h-14 items-start gap-3">
        <Monogram attribution={attribution} />
        <div className="min-w-0">
          <h3 className="text-h4 text-ink">{video.label ?? video.title}</h3>
          <p
            className={cn(
              "mt-1 text-micro",
              named ? "text-muted" : "text-faint",
            )}
          >
            {named ? attributionLine(attribution) : "Client testimonial"}
          </p>
        </div>
      </div>
    </article>
  );
}

export function TestimonialGrid({ videos }: { videos: Video[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <TestimonialCard key={video.id} video={video} />
      ))}
    </div>
  );
}
