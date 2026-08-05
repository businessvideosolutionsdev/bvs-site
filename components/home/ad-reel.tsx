import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { VideoEmbed } from "@/components/video-embed";
import { adExamples } from "@/content/videos";

/*
 * Ad creative reel.
 *
 * A horizontal rail rather than a second grid — six 9:16 cards stacked in a grid
 * would read as a repeat of the testimonial section directly above. Every card
 * is a click-to-play facade, so the whole rail costs six lazy thumbnails and no
 * YouTube JavaScript.
 *
 * TODO: the source titles are "BVS Ad Example 1..6". They are the real titles, so
 * they stand, but a real client name and category per spot would make this
 * section far stronger and would let each one carry VideoObject schema.
 */

export function AdReel() {
  if (adExamples.length === 0) return null;

  return (
    <Section tone="canvas" size="lg">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-copy">
          <Eyebrow>Selected work</Eyebrow>
          <h2 className="mt-6 text-h2">
            The ad creative itself.
          </h2>
          <p className="mt-6 text-lead text-muted">
            Vertical spots built for the feed — written, shot and cut to
            convert, not just to look good.
          </p>
        </div>

        <Link
          href="/work/"
          className="group inline-flex shrink-0 items-center gap-2 text-small font-medium text-accent transition-colors hover:text-ink"
        >
          See more work
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5"
          >
            &rarr;
          </span>
        </Link>
      </div>

      <ul className="mt-14 -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-5 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        {adExamples.map((video) => (
          <li
            key={video.id}
            className="w-[15rem] shrink-0 snap-start sm:w-[16.5rem]"
          >
            <VideoEmbed
              id={video.id}
              title={video.title}
              vertical={video.vertical}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
