import Header from "@/src/components/Header/Header";
import Hero from "@/src/components/hero/Hero";
import Herramientas from "@/src/components/home/herramientas/Herramientas";
import Planes from "@/src/components/home/planes/Planes";
import styles from "./page.module.css";
import Footer from "@/src/components/footer/Footer";

export default function Home() {
  return (
    <main>
      <Header />

      <div className={styles.mainBackground}>
        <div className={styles.ambientGrid} aria-hidden="true" />
        <div className={styles.ambientGlowLeft} aria-hidden="true" />
        <div className={styles.ambientGlowRight} aria-hidden="true" />

        <Hero />
        <Herramientas />
        <Planes />
        <Footer />
      </div>
    </main>
  );
}