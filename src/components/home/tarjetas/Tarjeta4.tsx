"use client";

import Image from "next/image";
import { Check, Package, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Tarjeta4.module.css";

export default function Tarjeta4() {
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
        <div className={styles.number}>04</div>

        <div className={styles.header}>
          <div className={styles.icon}>
            <Package size={42} strokeWidth={1.8} />
          </div>

          <div className={styles.title}>
            <span>Catálogo</span>
            <span>
              <strong>inteligente</strong>
            </span>
          </div>
        </div>

        <p className={styles.description}>
          Organizá todos tus productos con
          <br />
          buscador, filtros, variantes y ofertas,
          <br />
          para que cada cliente encuentre
          <br />
          <strong>lo que necesita más rápido.</strong>
        </p>

        <div
          className={styles.demoBox}
          onClick={() => setModalAbierto(true)}
          onKeyDown={abrirModalConTeclado}
          role="button"
          tabIndex={0}
          aria-label="Abrir video del catálogo inteligente"
        >
          <div className={styles.demoTitle}>
            <span className={styles.demoLine} />
            <p>
              Así funciona el <strong>catálogo</strong>
            </p>
            <span className={styles.demoLine} />
          </div>

          <div className={styles.demoImage}>
            <Image
              src="/tarjetas/icono4.png"
              alt="Demostración del catálogo inteligente"
              width={1536}
              height={1024}
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
          <p>Menos consultas, más pedidos y más ventas.</p>
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
            aria-label="Video del catálogo inteligente"
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
                Así funciona el <strong>catálogo</strong>
              </p>
              <span className={styles.modalLine} />
            </div>

            <div className={styles.modalImageWrap}>
              <div className={styles.modalVideoWrap}>
                <video
                  ref={videoRef}
                  className={styles.modalVideo}
                  src="/tarjetas/video4.mp4"
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