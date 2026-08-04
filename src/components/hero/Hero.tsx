"use client";

import { ArrowRight, Check, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [esMobile, setEsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");

    const actualizarVista = () => {
      setEsMobile(media.matches);
    };

    actualizarVista();
    media.addEventListener("change", actualizarVista);

    return () => {
      media.removeEventListener("change", actualizarVista);
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches ||
      navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      hero.style.setProperty("--pointer-x", "0");
      hero.style.setProperty("--pointer-y", "0");
      hero.style.setProperty("--spot-x", "72%");
      hero.style.setProperty("--spot-y", "42%");
      return;
    }

    let frameId = 0;
    let latestEvent: PointerEvent | null = null;
    let heroRect = hero.getBoundingClientRect();

    const updateHeroRect = () => {
      heroRect = hero.getBoundingClientRect();
    };

    const updatePointer = () => {
      if (!latestEvent) {
        frameId = 0;
        return;
      }

      const x = (latestEvent.clientX - heroRect.left) / heroRect.width - 0.5;
      const y = (latestEvent.clientY - heroRect.top) / heroRect.height - 0.5;

      hero.style.setProperty("--pointer-x", `${x}`);
      hero.style.setProperty("--pointer-y", `${y}`);
      hero.style.setProperty(
        "--spot-x",
        `${latestEvent.clientX - heroRect.left}px`,
      );
      hero.style.setProperty(
        "--spot-y",
        `${latestEvent.clientY - heroRect.top}px`,
      );

      latestEvent = null;
      frameId = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      latestEvent = event;

      if (frameId === 0) {
        frameId = window.requestAnimationFrame(updatePointer);
      }
    };

    const resetPointer = () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }

      latestEvent = null;

      hero.style.setProperty("--pointer-x", "0");
      hero.style.setProperty("--pointer-y", "0");
      hero.style.setProperty("--spot-x", "72%");
      hero.style.setProperty("--spot-y", "42%");
    };

    hero.addEventListener("pointermove", handlePointerMove);
    hero.addEventListener("pointerleave", resetPointer);
    window.addEventListener("resize", updateHeroRect);
    window.addEventListener("scroll", updateHeroRect, { passive: true });

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }

      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", resetPointer);
      window.removeEventListener("resize", updateHeroRect);
      window.removeEventListener("scroll", updateHeroRect);
    };
  }, []);

  return (
    <section ref={heroRef} id="inicio" className={styles.hero}>
      <div className={styles.aurora} aria-hidden="true" />
      <div className={styles.pointerGlow} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.scanline} aria-hidden="true" />

      {!esMobile && (
        <div className={styles.beams} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      )}

      <div className={styles.orbits} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className={styles.particles} aria-hidden="true">
        {Array.from({ length: 14 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textInterface}>
            <div className={styles.panelEffects} aria-hidden="true">
              <div className={styles.panelHalo} />

              {!esMobile && (
                <div className={styles.panelBeams}>
                  <span />
                  <span />
                  <span />
                </div>
              )}

              <div className={styles.panelOrbits}>
                <span />
                <span />
                <span />
              </div>

              <div className={styles.panelParticles}>
                {Array.from({ length: 10 }).map((_, index) => (
                  <span key={index} />
                ))}
              </div>
            </div>

            <div className={styles.interfaceContent}>
              <div className={styles.interfaceTop}>
                <span className={styles.interfaceCode}>
                  SALES TECHNOLOGY / 01
                </span>
                <span className={styles.interfaceStatus}>ONLINE</span>
              </div>

              <span className={styles.badge}>
                <i />
                TECNOLOGÍA PARA NEGOCIOS QUE QUIEREN VENDER MÁS
              </span>

              <div className={styles.titleShell}>
                <span className={styles.titleIndex}>01</span>

                <h1 className={styles.title}>
                  <span className={styles.titleLine}>
                    Tu negocio puede vender
                  </span>

                  <span className={styles.titleAccent}>
                    incluso cuando no estás atendiendo
                  </span>
                </h1>

                <span className={styles.titleRail} aria-hidden="true">
                  <i />
                </span>
              </div>

              <p className={styles.description}>
                Desarrollamos herramientas de venta para pinturerías, negocios
                de piscinas y comercios con grandes catálogos, automatizando
                consultas, guiando a cada cliente y generando más pedidos.
              </p>

              <div className={styles.actions}>
                <a href="#planes" className={styles.primaryButton}>
                  <span>Quiero vender más</span>
                  <ArrowRight size={18} strokeWidth={1.9} />
                </a>

                <a href="#herramientas" className={styles.secondaryButton}>
                  Nuestras herramientas
                </a>
              </div>

              <div className={styles.features}>
                <span>
                  <Check size={15} />
                  Menos consultas repetidas
                </span>
                <span>
                  <Check size={15} />
                  Clientes mejor guiados
                </span>
                <span>
                  <Check size={15} />
                  Más pedidos por WhatsApp
                </span>
              </div>

              <div className={styles.interfaceFooter} aria-hidden="true">
                <span>SMART — TOOLS</span>
                <span>SALES — SYSTEM</span>
                <span>BUILD — 2026</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.deviceHalo} aria-hidden="true" />

          <Image
            src="/banner/banner1.png"
            alt="Herramientas de venta para computadora y celular"
            width={1400}
            height={1050}
            priority
            className={styles.bannerImage}
          />

          <div className={styles.floatingCard}>
            <span className={styles.floatingIcon}>
              <MessageCircle size={18} strokeWidth={1.8} />
            </span>

            <span>
              <small>HERRAMIENTAS DE VENTA</small>
              <strong>PC + Celular</strong>
            </span>
          </div>
        </div>
      </div>

      <div className={styles.bottomFade} aria-hidden="true" />
    </section>
  );
}