import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WebCreator",
    short_name: "WebCreator",
    description: "Diseño y desarrollo de páginas web modernas.",
    start_url: "/",
    display: "standalone",
    background_color: "#060608",
    theme_color: "#060608",
  };
}
