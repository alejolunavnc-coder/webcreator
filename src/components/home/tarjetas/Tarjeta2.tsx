"use client";

import Image from "next/image";
import { Check, PaintBucket, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Tarjeta2.module.css";

export default function Tarjeta2() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [montado, setMontado] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMontado(true);
  }, []);

  useEffect(() => {
    if (!modalAbierto) return;

    const cerrarConEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModalAbierto(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", cerrarConEscape);

    window.requestAnimationFrame(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    });

    return () => {
      videoRef.current?.pause();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", cerrarConEscape);
    };
  }, [modalAbierto]);

  const abrirModalConTeclado = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setModalAbierto(true);
    }
  };

  return (
    <>
      <article className={styles.card}>
        <div className={styles.number}>02</div>

        <div className={styles.header}>
          <div className={styles.icon}>
            <PaintBucket size={42} strokeWidth={1.8} />
          </div>

          <div className={styles.title}>
            <span>Calculadora</span>
            <span>
              de <strong>pintura</strong>
            </span>
          </div>
        </div>

        <p className={styles.description}>
          Calculá <strong>automáticamente</strong> la cantidad
          <br />
          de pintura necesaria y recomendá
          <br />
          los productos adecuados
          <br />
          <strong>en segundos.</strong>
        </p>

        <div
          className={styles.demoBox}
          onClick={() => setModalAbierto(true)}
          onKeyDown={abrirModalConTeclado}
          role="button"
          tabIndex={0}
          aria-label="Abrir video de la calculadora de pintura"
        >
          <div className={styles.demoTitle}>
            <span className={styles.demoLine} />
            <p>
              Así funciona la <strong>calculadora</strong>
            </p>
            <span className={styles.demoLine} />
          </div>

          <div className={styles.demoImage}>
            <Image
              src="/tarjetas/icono2.png"
              alt="Demostración de la calculadora de pintura"
              width={950}
              height={1520}
              className={styles.image}
              draggable={false}
              priority
            />
          </div>

          <div className={styles.videoHover} aria-hidden="true">
            <span className={styles.videoHoverIcon}>
              <Play size={22} fill="currentColor" strokeWidth={2} />
            </span>
            <span className={styles.videoHoverText}>Ver video</span>
          </div>
        </div>

        <div className={styles.footer}>
          <span className={styles.footerIcon}>
            <Check size={13} strokeWidth={3} />
          </span>
          <p>Menos dudas, más confianza y más ventas.</p>
        </div>
      </article>

      {montado &&
        modalAbierto &&
        createPortal(
        <div
          className={styles.modalBackdrop}
          role="presentation"
          onMouseDown={() => setModalAbierto(false)}
        >
          <div
            className={styles.modalContent}
            role="dialog"
            aria-modal="true"
            aria-label="Video de la calculadora de pintura"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => setModalAbierto(false)}
              aria-label="Cerrar video"
            >
              <X size={22} strokeWidth={2} />
            </button>

            <div className={styles.modalTitle}>
              <span className={styles.modalLine} />
              <p>
                Así funciona la <strong>calculadora</strong>
              </p>
              <span className={styles.modalLine} />
            </div>

            <div className={styles.modalImageWrap}>
              <div className={styles.modalVideoWrap}>
                <video
                  ref={videoRef}
                  className={styles.modalVideo}
                  src="/tarjetas/video2.mp4"
                  controls
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                  onLoadedData={() => videoRef.current?.play().catch(() => {})}
                >
                  Tu navegador no puede reproducir este video.
                </video>
              </div>
            </div>
          </div>
        </div>,
          document.body,
        )}
    </>
  );
}