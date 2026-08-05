import { team, type TeamMember } from "@/content/site";

/**
 * Real bios, from the client's own live site.
 *
 * `content/site.ts` carries the three real names and roles but ships empty
 * `bio` strings (it is owned elsewhere and its TODO is still open). Rather than
 * render three people with no description, the verbatim copy lives here keyed
 * by the same slug, and `teamMembers` prefers whatever site.ts holds the moment
 * that file is filled in. Nothing below is written by us: it is their existing
 * bio copy with the subject's name restored to the front of the sentence.
 */
const BIOS: Record<string, string> = {
  "christian-cotrone":
    "Christian is a results-driven filmmaker specializing in high-converting video assets for the Florida business community. With over ten years of experience, he has mastered the craft of short-form video branding.",
  "locksley-lennox":
    "Locksley is the technical engine behind the campaigns, ensuring that high-quality content actually reaches the right audience. He specializes in building robust ad frameworks and smart automation sequences.",
  "jacob-ballard":
    "Jacob ensures that the promise of high-end video branding is delivered with clinical precision. As the head of production and fulfillment, he manages the complex logistics required to take a project from a conceptual storyboard to a finished, market-ready asset.",
};

/**
 * The team with bios resolved. Exported so the page can build Person schema
 * from exactly the same copy the page renders — a `description` in JSON-LD that
 * does not match the visible text is the kind of mismatch Google penalises.
 */
export const teamMembers: TeamMember[] = team.map((member) => ({
  ...member,
  bio: member.bio || BIOS[member.slug] || "",
}));

/** "Christian Cotrone" -> "CC". */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * No headshots exist yet.
 *
 * A monogram is a deliberate design, not a gap: no broken image icon, no grey
 * silhouette stock avatar, and no layout shift when real photography lands in
 * `member.image` — the portrait tile is already the right shape and size.
 *
 * TODO: three headshots, shot 4:5, into /public and referenced from
 * `content/site.ts` `team[].image`.
 */
function Portrait({ member }: { member: TeamMember }) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-line bg-raised shadow-lift">
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(124,140,255,0.16),transparent_65%)]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center font-display text-h1 tracking-tight text-accent/70"
      >
        {initials(member.name)}
      </span>
    </div>
  );
}

export function TeamGrid() {
  return (
    <ul className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {teamMembers.map((member) => (
        <li key={member.slug}>
          <Portrait member={member} />

          <h3 className="mt-7 text-h3 text-ink">{member.name}</h3>
          <p className="mt-2 font-mono text-eyebrow text-accent uppercase">
            {member.role}
          </p>
          {member.bio && (
            <p className="mt-5 text-body text-muted">{member.bio}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
