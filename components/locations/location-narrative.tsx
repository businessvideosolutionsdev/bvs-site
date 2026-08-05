import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section, type SectionProps } from "@/components/ui/section";

export type LocationNarrativeProps = {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  /** Optional column beside the prose — the places list, a note, a link set. */
  aside?: ReactNode;
  tone?: SectionProps["tone"];
  divided?: boolean;
  id?: string;
};

/**
 * A heading plus real paragraphs of city-specific prose.
 *
 * Used twice per page — once for the market analysis, once for how the work is
 * delivered there. Both headings are authored per city rather than templated,
 * because "Video marketing in {city}" repeated twelve times is precisely the
 * signal that gets a set of location pages classified as doorway pages.
 */
export function LocationNarrative({
  eyebrow,
  heading,
  paragraphs,
  aside,
  tone = "none",
  divided = false,
  id,
}: LocationNarrativeProps) {
  return (
    <Section id={id} tone={tone} divided={divided}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className={aside ? "lg:col-span-7" : "lg:col-span-8"}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-6 text-h2">{heading}</h2>

          <div className="mt-8 flex max-w-copy flex-col gap-6">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="text-body text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {aside && <div className="lg:col-span-5">{aside}</div>}
      </div>
    </Section>
  );
}
