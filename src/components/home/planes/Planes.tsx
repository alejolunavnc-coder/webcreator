import CarruselEjemplos from "./carrusel/CarruselEjemplos";
import styles from "./Planes.module.css";

export default function Planes() {
  return (
    <section id="planes" className={styles.section}>
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
            EJEMPLOS DE PROYECTOS
          </span>

          <h2 className={styles.title}>
            Cada negocio necesita
            <span>una solución diferente.</span>
          </h2>

          <p className={styles.subtitle}>
            Mirá algunos ejemplos de proyectos para distintos rubros.
            Cada presupuesto se adapta a la cantidad de productos,
            categorías y herramientas que necesita tu negocio.
            <strong> Tu proyecto se cotiza de forma personalizada.</strong>
          </p>
        </div>

        <CarruselEjemplos />
      </div>
    </section>
  );
}