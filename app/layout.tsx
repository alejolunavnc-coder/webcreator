import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WebCreator | Páginas web que venden",
  description:
    "Diseño y desarrollo de páginas web modernas para negocios, marcas y emprendimientos.",
  metadataBase: new URL("https://webcreator.ar"),
  openGraph: {
    title: "WebCreator",
    description: "Páginas web modernas, rápidas y preparadas para vender.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
