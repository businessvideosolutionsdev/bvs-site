/**
 * The five-step approach.
 *
 * The step names are the client's own and are verbatim. The one-line gloss under
 * each is deliberately restricted to restating things they already say about
 * themselves — that they integrated video production, strategic advertising,
 * marketing automation and performance analysis into one process, and that
 * every project supports a larger business objective. No timelines, no
 * deliverable counts, no revision policy, no numbers: none of that is known,
 * and a process page that invents them is a process page the client cannot
 * actually honour.
 *
 * TODO: client to confirm or replace each `detail` line with how the step
 * really runs.
 */
const STEPS: { name: string; detail: string }[] = [
  {
    name: "Discovery",
    detail:
      "Before anything is filmed, we get clear on the business objective the video has to support.",
  },
  {
    name: "Strategy",
    detail:
      "Production and advertising are planned together, so the creative is built for where it will actually run.",
  },
  {
    name: "Production",
    detail:
      "Filming and post, handled as one part of the process rather than as the whole service.",
  },
  {
    name: "Distribution",
    detail:
      "The finished asset goes to work: paid placement, automation and follow-up, not just an upload.",
  },
  {
    name: "Optimization",
    detail:
      "Performance analysis feeds the next round of creative, measured against business results.",
  },
];

export function Approach() {
  return (
    <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {STEPS.map((step, index) => (
        <li
          key={step.name}
          className="flex flex-col bg-canvas p-8 transition-colors hover:bg-raised"
        >
          <span className="font-mono text-eyebrow text-accent uppercase">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-6 text-h3 text-ink">{step.name}</h3>
          <p className="mt-3 text-small text-muted">{step.detail}</p>
        </li>
      ))}

      {/*
       * Five steps in a 2- or 3-up grid leaves one ragged cell showing the
       * hairline colour through the gap. This sixth, empty cell squares it off.
       */}
      <li aria-hidden="true" className="hidden bg-canvas sm:block" />
    </ol>
  );
}
