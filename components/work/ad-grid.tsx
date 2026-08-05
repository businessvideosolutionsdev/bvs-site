import type { Video } from "@/content/videos";
import { VideoEmbed } from "@/components/video-embed";

/**
 * The ad reel.
 *
 * The source titles are "BVS Ad Example 1"..."6" and nothing else is known
 * about them — no client, no brief, no result. So the caption is a number and
 * nothing more. Numbering is not a claim; "Home services campaign, 4.2x ROAS"
 * would be, and that is exactly the kind of copy the old theme-demo portfolio
 * was full of.
 *
 * TODO: for each ad, the client (with permission to name them), the objective
 * and the outcome. That turns this grid into six case studies; until then it is
 * an honest craft sample.
 */
export function AdGrid({ videos }: { videos: Video[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video, index) => (
        <figure key={video.id}>
          <VideoEmbed id={video.id} title={video.title} vertical={video.vertical} />
          <figcaption className="mt-4 flex items-center gap-3 font-mono text-eyebrow text-faint uppercase">
            <span aria-hidden="true" className="h-px w-6 shrink-0 bg-line-strong" />
            Ad example {String(index + 1).padStart(2, "0")}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
