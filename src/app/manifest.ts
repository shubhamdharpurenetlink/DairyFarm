import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Laxmi Dairy Farm",
    short_name: "Laxmi Dairy",
    description:
      "Pure A2 milk, training programs, and cow care knowledge — all in one place",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#FAFAF7",
    theme_color: "#2E7D5B",
    lang: "en",
    dir: "ltr",
    categories: ["food", "education", "lifestyle"],
    icons: [
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
