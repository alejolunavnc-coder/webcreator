"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";
import styles from "./Header.module.css";

const navigation = [
  { label: "Inicio", href: "#inicio" },
  { label: "Herramientas", href: "#herramientas" },
  { label: "Ejemplos", href: "#planes" },
];

const instagramUrl = "https://www.instagram.com/webcreator.ar/?hl=es";

export default function Header() {
  return (
    <header className={styles.header}>
      <a
        href="#inicio"
        className={styles.brand}
        aria-label="Ir al inicio de WebCreator"
      >
        <span className={styles.logo}>
          <Image
            src="/logo/logo.png"
            alt="Logo de WebCreator"
            width={62}
            height={62}
            priority
            className={styles.logoImage}
          />
        </span>

        <span className={styles.brandText}>
          <strong>webcreator.ar</strong>
          <small>CREADORES WEB</small>
        </span>
      </a>

      <nav className={styles.desktopNav} aria-label="Navegación principal">
        {navigation.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            className={index === 0 ? styles.active : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cta}
        aria-label="Abrir Instagram de WebCreator"
      >
        <Instagram size={18} strokeWidth={2} />
        Instagram
      </a>
    </header>
  );
}