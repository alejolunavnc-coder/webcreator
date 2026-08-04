"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import styles from "./Herramientas.module.css";

type Props = {
  titulo: string;
  descripcion: string;
  imagen: string;
  color?: string;
};

export default function TarjetaHerramienta({
  titulo,
  descripcion,
  imagen,
  color = "#8b5cf6",
}: Props) {
  return (
    <article
      className={styles.card}
      style={{ ["--glow" as any]: color }}
    >
      <div className={styles.cardGlow} />

      <div className={styles.cardImage}>
        <Image
          src={imagen}
          alt={titulo}
          width={560}
          height={420}
          className={styles.image}
          priority
        />
      </div>

      <div className={styles.cardContent}>
        <span className={styles.cardLabel}>
          HERRAMIENTA
        </span>

        <h3 className={styles.cardTitle}>
          {titulo}
        </h3>

        <p className={styles.cardDescription}>
          {descripcion}
        </p>

        <button className={styles.cardButton}>
          <span>Ver más</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
}