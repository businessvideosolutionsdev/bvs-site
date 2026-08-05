"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/components/ui/cn";

/**
 * The GoHighLevel booking widget, on the client's own white-labelled domain.
 * Change this one line to point at a different calendar.
 */
export const BOOKING_WIDGET_URL =
  "https://get.businessvideosolutions.net/widget/booking/tsH596xa7wEMt84KP8bH";

/**
 * GoHighLevel's parent-side embed script. It scans the page for iframes and
 * speaks the `[iFrameSizer]` protocol to the `iframeResizer.contentWindow`
 * script the widget already loads, so the iframe grows and shrinks with the
 * booking flow instead of scrolling inside a fixed box.
 *
 * Verified live: 200, ~34 KB, `text/javascript`, and it exposes
 * `window.iFrameResize`. It references no other hosts of its own.
 */
export const BOOKING_EMBED_SCRIPT_URL =
  "https://link.msgsndr.com/js/form_embed.js";

/**
 * Height before the widget reports its real size. Roughly a month grid plus
 * the time-slot column, so the section does not visibly jump on load. The
 * iframe is never allowed to be shorter than this.
 */
const DEFAULT_MIN_HEIGHT = 720;

/**
 * Height used when the resizer never arrives — script blocked, offline, or GHL
 * changed the URL. Tall enough to show the whole booking flow without the
 * resizer's help, because `scrolling="no"` means a short iframe would hide it.
 */
const DEFAULT_FALLBACK_HEIGHT = 1100;

/** Start loading this far before the iframe scrolls into view. */
const LAZY_ROOT_MARGIN = "600px";

/** How long to wait for the script before falling back to a tall iframe. */
const SCRIPT_TIMEOUT_MS = 8000;

/** The subset of `window` the embed script adds. */
type ResizerWindow = Window & {
  iFrameResize?: (
    options: Record<string, unknown>,
    target: HTMLIFrameElement | string
  ) => void;
};

export type BookingEmbedProps = {
  /** Override the widget. Defaults to `BOOKING_WIDGET_URL`. */
  url?: string;
  /**
   * Accessible name for the iframe. Screen readers announce this as the frame's
   * label, so it should say what the frame *is*, not merely "booking".
   */
  title?: string;
  /** Placeholder/minimum height in px. Defaults to 720. */
  minHeight?: number;
  /** Height used if the resizer never loads. Defaults to 1100. */
  fallbackHeight?: number;
  /**
   * Load immediately instead of waiting for the iframe to near the viewport.
   * Use this when the widget is the point of the page (a dedicated /book/
   * route) rather than a section far down a long page.
   */
  eager?: boolean;
  /** Classes for the outer wrapper. Layout belongs to the calling page. */
  className?: string;
};

/**
 * Embeds the GoHighLevel booking calendar.
 *
 * Deliberately unstyled beyond what the mechanics require — the surrounding
 * section, heading, and spacing belong to the page that renders this.
 *
 * Mechanics worth knowing:
 *
 *  - **Lazy by default.** The `src` is not set until the component nears the
 *    viewport, so a booking widget in a page footer costs nothing on first
 *    paint. Pass `eager` to opt out.
 *  - **Client-side navigation safe.** GHL's script initialises once, on
 *    `DOMContentLoaded`, and has no MutationObserver — so an iframe that mounts
 *    during a client-side route change would never get picked up. This
 *    component calls `window.iFrameResize` against its own element instead of
 *    relying on that one-shot scan.
 *  - **Degrades instead of collapsing.** If the script fails or never reports,
 *    the iframe locks to `fallbackHeight` rather than sitting at a stub height
 *    with the booking flow clipped out of sight.
 */
export function BookingEmbed({
  url = BOOKING_WIDGET_URL,
  title = "Book a call with Business Video Solutions",
  minHeight = DEFAULT_MIN_HEIGHT,
  fallbackHeight = DEFAULT_FALLBACK_HEIGHT,
  eager = false,
  className,
}: BookingEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const attachedRef = useRef(false);

  const [shouldLoad, setShouldLoad] = useState(eager);
  const [resizerReady, setResizerReady] = useState(false);
  const [degraded, setDegraded] = useState(false);

  /* --- 1. lazy trigger --------------------------------------------------- */

  useEffect(() => {
    if (shouldLoad) return;

    const node = containerRef.current;

    // No container yet, or a browser without IntersectionObserver: load on the
    // next tick rather than never. Scheduled rather than called inline so the
    // state change does not cascade a second render out of this effect.
    if (!node || typeof IntersectionObserver === "undefined") {
      const timer = window.setTimeout(() => setShouldLoad(true), 0);
      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: LAZY_ROOT_MARGIN }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldLoad]);

  /* --- 2. attach the resizer --------------------------------------------- */

  const attachResizer = useCallback(() => {
    if (attachedRef.current) return true;

    const element = iframeRef.current;
    const resize = (window as ResizerWindow).iFrameResize;
    if (!element || typeof resize !== "function") return false;

    let origin: string;
    try {
      origin = new URL(url).origin;
    } catch {
      return false;
    }

    try {
      resize(
        {
          // Only accept sizing messages from the widget's own origin.
          checkOrigin: [origin],
          // The widget reports its own height; don't second-guess it.
          heightCalculationMethod: "bodyOffset",
          warningTimeout: 0,
        },
        element
      );
      attachedRef.current = true;
      setResizerReady(true);
      return true;
    } catch {
      return false;
    }
  }, [url]);

  /* --- 3. load the script ------------------------------------------------ */

  useEffect(() => {
    if (!shouldLoad) return;

    let cancelled = false;
    let script: HTMLScriptElement | null = null;

    const onLoad = () => {
      if (!cancelled) attachResizer();
    };
    const onError = () => {
      if (!cancelled) setDegraded(true);
    };

    // Already loaded by another BookingEmbed or an earlier page view? Attach
    // to it rather than injecting a second copy. Scheduled on the next tick so
    // the state change does not cascade a render out of this effect.
    const immediate =
      typeof (window as ResizerWindow).iFrameResize === "function"
        ? window.setTimeout(onLoad, 0)
        : undefined;

    if (immediate === undefined) {
      const existing = document.querySelector<HTMLScriptElement>(
        `script[src="${BOOKING_EMBED_SCRIPT_URL}"]`
      );
      script = existing ?? document.createElement("script");
      script.addEventListener("load", onLoad);
      script.addEventListener("error", onError);

      if (!existing) {
        script.src = BOOKING_EMBED_SCRIPT_URL;
        script.async = true;
        document.body.appendChild(script);
      }
    }

    // The script can load yet still not sync heights — a CDN edge case, or a
    // future GHL change. Don't leave the visitor staring at a clipped widget.
    const watchdog = window.setTimeout(() => {
      if (cancelled) return;
      if (!attachResizer()) setDegraded(true);
    }, SCRIPT_TIMEOUT_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(watchdog);
      if (immediate !== undefined) window.clearTimeout(immediate);
      script?.removeEventListener("load", onLoad);
      script?.removeEventListener("error", onError);
      // The <script> itself is left in place on purpose: it is shared, and
      // removing it would not un-run it anyway.
    };
  }, [shouldLoad, attachResizer]);

  /* --- 4. iframe onLoad -------------------------------------------------- */

  const handleIframeLoad = useCallback(() => {
    // The script may have finished before the iframe did. Try again here so
    // whichever lands last completes the handshake.
    attachResizer();
  }, [attachResizer]);

  /* --- 5. render --------------------------------------------------------- */

  // Once the resizer is driving the height, stop constraining it — otherwise
  // an inline height would fight every resize message.
  const height = resizerReady
    ? undefined
    : degraded
      ? fallbackHeight
      : minHeight;

  return (
    <div
      ref={containerRef}
      className={cn("w-full", className)}
      style={{ minHeight }}
    >
      {shouldLoad ? (
        <iframe
          ref={iframeRef}
          src={url}
          title={title}
          loading="lazy"
          scrolling="no"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={handleIframeLoad}
          className="block w-full border-0"
          style={{ height, minHeight }}
        />
      ) : (
        // Reserves the same space before the iframe mounts, so the lazy load
        // never shifts the page.
        <div aria-hidden="true" style={{ height: minHeight }} />
      )}

      <noscript>
        <p>
          <a href={url} target="_blank" rel="noopener noreferrer">
            Book a call with Business Video Solutions
          </a>{" "}
          — our booking calendar needs JavaScript, so this link opens it
          directly.
        </p>
      </noscript>
    </div>
  );
}

export default BookingEmbed;
