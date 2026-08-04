"use client";

import Image from "next/image";
import { Check, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Tarjeta.module.css";

const pasos = [
  { numero: "1", texto: <>Visitás<br />la web</> },
  { numero: "2", texto: <>Instalás en<br />tu dispositivo</> },
  { numero: "3", texto: <>El ícono aparece<br />en tu pantalla</> },
  { numero: "4", texto: <>Abrís como<br />una App nativa</> },
];

export default function Tarjeta() {
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
        <div className={styles.number}>01</div>

        <div className={styles.header}>
          <Image
            src="/tarjetas/icono1.png"
            alt="App"
            width={56}
            height={56}
            className={styles.icon}
            priority
          />

          <div className={styles.title}>
            <span>Convertí tu web</span>
            <span>
              en una <strong>App</strong>
            </span>
          </div>
        </div>

        <p className={styles.description}>
          Tus clientes pueden <strong>instalar tu negocio</strong>
          <br />
          en la pantalla principal de su celular,
          <br />
          acceder con un toque y comprar
          <br />
          <strong>más rápido.</strong>
        </p>

        <div
          className={styles.demoBox}
          onClick={() => setModalAbierto(true)}
          onKeyDown={abrirModalConTeclado}
          role="button"
          tabIndex={0}
          aria-label="Abrir demostración en video de la AppWeb"
        >
          <div className={styles.demoTitle}>
            <span className={styles.demoLine} />
            <p>
              Así funciona la <strong>AppWeb</strong>
            </p>
            <span className={styles.demoLine} />
          </div>

          <div className={styles.demoImage}>
            <Image
              src="/tarjetas/tarjeta1.png"
              alt="Demostración para instalar la AppWeb"
              width={1200}
              height={1800}
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

          <div className={styles.steps} aria-hidden="true">
            {pasos.map((paso) => (
              <div className={styles.step} key={paso.numero}>
                <span className={styles.stepNumber}>{paso.numero}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          <span className={styles.footerIcon}>
            <Check size={13} strokeWidth={3} />
          </span>
          <p>Acceso rápido, experiencia fluida y más ventas.</p>
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
              aria-label="Video ampliado de la AppWeb"
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
                  Así funciona la <strong>AppWeb</strong>
                </p>
                <span className={styles.modalLine} />
              </div>

              <div className={styles.modalImageWrap}>
                <div className={styles.modalVideoWrap}>
                  <video
                    ref={videoRef}
                    className={styles.modalVideo}
                    src="/tarjetas/video1.mp4"
                    controls
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                    onLoadedData={() =>
                      videoRef.current?.play().catch(() => {})
                    }
                  >
                    Tu navegador no puede reproducir este video.
                  </video>
                </div>

                <div className={styles.modalSteps}>
                  {pasos.map((paso) => (
                    <div className={styles.modalStep} key={paso.numero}>
                      <span className={styles.modalStepNumber}>
                        {paso.numero}
                      </span>
                      <p>{paso.texto}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}