import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages serves plain static assets — there is no Next.js server.
  // `export` emits the entire site as HTML/CSS/JS into ./out at build time.
  output: "export",

  // The default image loader requires a server, so serve images as authored.
  images: { unoptimized: true },

  // Emit /about/index.html instead of /about.html so every static host
  // resolves clean URLs the same way.
  trailingSlash: true,
};

export default nextConfig;
