import type { SchemaGraph, SchemaNode } from "@/lib/schema";

/**
 * Renders structured data as an `application/ld+json` script tag.
 *
 * Server component: under `output: "export"` the JSON is serialised at build
 * time and baked into the HTML, so crawlers see it without executing anything.
 */

/**
 * Characters that must never reach the browser raw inside a script element.
 *
 * `<` is the dangerous one: a `</script>` sequence appearing inside a string
 * value — a video description quoting HTML, say — would close the tag early and
 * turn the rest of the JSON into markup. The rest are defensive: `&` and `>`
 * against HTML-context edge cases, U+2028/U+2029 because they are literal line
 * terminators in JavaScript but legal inside a JSON string.
 */
const ESCAPES: Record<string, string> = {
  "<": "\\u003c",
  ">": "\\u003e",
  "&": "\\u0026",
  ["\u2028"]: "\\u2028",
  ["\u2029"]: "\\u2029",
};

/** JSON-stringifies structured data safely for embedding in a script tag. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(
    /[<>&\u2028\u2029]/g,
    (character) => ESCAPES[character],
  );
}

export type JsonLdProps = {
  /** A `@graph` document from `graph()`, a single node, or an array of nodes. */
  data: SchemaGraph | SchemaNode | SchemaNode[];
  /**
   * DOM id for the script tag. Worth setting when a page emits several, so the
   * offending one is identifiable in the Rich Results Test.
   */
  id?: string;
};

export function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // The payload is our own serialised JSON, escaped above — never user input.
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
