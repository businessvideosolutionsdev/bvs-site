"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Fires a Meta Pixel standard event once on mount.
 *
 * The page this replaces fired `fbq("track", "Schedule")` on load, which is how
 * booked strategy calls are attributed back to Meta ad spend. Rebuilding the
 * page without it would silently break conversion tracking and make the ad
 * account look like it stopped producing bookings.
 *
 * IMPORTANT: this only fires if the Pixel BASE script is present on the site.
 * It is not installed yet — see the TODO on the call-confirmation page.
 * Calling this without the base script is a safe no-op, not an error.
 */
export function MetaPixelEvent({ event }: { event: string }) {
  useEffect(() => {
    window.fbq?.("track", event);
  }, [event]);

  return null;
}
