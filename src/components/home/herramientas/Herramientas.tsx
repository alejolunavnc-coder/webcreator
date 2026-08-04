import Tarjeta from "../tarjetas/Tarjeta";
import Tarjeta2 from "../tarjetas/Tarjeta2";
import Tarjeta3 from "../tarjetas/Tarjeta3";
import Tarjeta4 from "../tarjetas/Tarjeta4";
import styles from "./Herramientas.module.css";

export default function Herramientas() {
  return (
    <section id="herramientas" className={styles.section}>
      <div className={styles.topBlend} aria-hidden="true" />
      <div className={styles.ambientGlow} aria-hidden="true" />
      <div className={styles.gridLeft} aria-hidden="true" />
      <div className={styles.gridRight} aria-hidden="true" />
      <div className={styles.orbitTop} aria-hidden="true" />
      <div className={styles.orbitBottom} aria-hidden="true" />
      <div className={styles.dotsLeft} aria-hidden="true" />
      <div className={styles.dotsRight} aria-hidden="true" />

      <div className={styles.stars} aria-hidden="true">
        {Array.from({ length: 10 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>

      <div className={styles.container}>
        <div className={styles.heading}>
          <span className={styles.kicker}>
            ¿POR QUÉ ELEGIR WEBCREATOR?
          </span>

          <h2 className={styles.title}>
            Herramientas que
            <span>venden por vos.</span>
          </h2>

          <p className={styles.subtitle}>
            Cada desarrollo está pensado para ahorrar tiempo,
            mejorar la experiencia del cliente y{" "}
            <strong>aumentar las ventas</strong> de tu negocio.
          </p>
        </div>

        <div className={styles.cards}>
          <Tarjeta />
          <Tarjeta2 />
          <Tarjeta3 />
          <Tarjeta4 />
        </div>
      </div>
    </section>
  );
}