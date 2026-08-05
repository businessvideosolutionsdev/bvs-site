import type { Video } from "@/content/videos";
import { youTubeVideoSchema, type SchemaNode } from "@/lib/schema";

/**
 * The facts a VideoObject needs that a YouTube ID cannot give us.
 *
 * Google requires `name`, `description`, `thumbnailUrl` and `uploadDate` before
 * a VideoObject is eligible for a video rich result. Three of those four are
 * derivable: `name` is the verified YouTube title in content/videos.ts,
 * `thumbnailUrl` comes from i.ytimg.com, and `embedUrl` from the ID.
 *
 * `description` and `uploadDate` are not derivable, and inventing either is
 * worse than omitting the markup — a fabricated upload date is a factual claim
 * made to a search engine, and Search Console reports an incomplete VideoObject
 * as an error rather than ignoring it.
 *
 * So the registry below is the drop-in point. Fill in an entry and that video
 * starts emitting schema on the next build with no other change anywhere.
 *
 * TODO: populate every ID from YouTube Studio (publish date + the real
 * description). Until then `videoSchemaNodes()` emits nothing for that video.
 * Both fields are required; a half-filled entry is skipped on purpose.
 */
export type VideoFacts = {
  /** ISO 8601 publish date from YouTube Studio, e.g. "2025-04-18". */
  uploadDate: string;
  /** One or two real sentences describing the video. Not the title again. */
  description: string;
  /** Runtime in seconds, if known. Optional — Google treats it as a bonus. */
  durationSeconds?: number;
};

/**
 * Keyed by YouTube video ID, matching the IDs in content/videos.ts.
 *
 * Deliberately empty. Every key that appears here must come from the client's
 * own YouTube Studio, not from a guess.
 */
export const videoFacts: Record<string, VideoFacts> = {
  /*
   * TODO: e.g.
   * "mARd-XNChiE": {
   *   uploadDate: "2025-00-00",
   *   description: "...",
   * },
   */
};

/** True once a video can produce a VideoObject Google will actually accept. */
export function hasVideoFacts(id: string): boolean {
  const facts = videoFacts[id];
  return Boolean(facts && facts.uploadDate && facts.description);
}

/**
 * VideoObject nodes for the videos on a page, skipping any that would ship
 * incomplete. Returns `[]` today; returns real nodes the moment `videoFacts`
 * is filled in.
 */
export function videoSchemaNodes(videos: Video[], path: string): SchemaNode[] {
  return videos.flatMap((video) => {
    const facts = videoFacts[video.id];
    if (!facts || !facts.uploadDate || !facts.description) return [];

    return [
      youTubeVideoSchema({
        youTubeId: video.id,
        name: video.title,
        description: facts.description,
        uploadDate: facts.uploadDate,
        durationSeconds: facts.durationSeconds,
        path,
      }),
    ];
  });
}
