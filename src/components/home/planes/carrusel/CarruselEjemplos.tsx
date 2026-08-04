"use client";

import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./CarruselEjemplos.module.css";

const ejemplos = [
  {
    id: 1,
    imagen: "/ejemplos/ej1.png",
    alt: "Ejemplo de proyecto web para un local de electrodomésticos",
  },
  {
    id: 2,
    imagen: "/ejemplos/ej2.png",
    alt: "Ejemplo de proyecto web para una pinturería",
  },
  {
    id: 3,
    imagen: "/ejemplos/ej3.png",
    alt: "Ejemplo de proyecto web para una panchería",
  },
  {
    id: 4,
    imagen: "/ejemplos/ej4.png",
    alt: "Ejemplo de proyecto web para un local de sillones",
  },
  {
    id: 5,
    imagen: "/ejemplos/ej5.png",
    alt: "Ejemplo de proyecto web para un local de productos para piscina",
  },
];

const numeroWhatsApp = "5491123193387";

const mensajeWhatsApp =
  "Hola! Estoy interesada/o en crear una página web para mi negocio o marca personal. Me gustaría recibir más información y conocer una propuesta adaptada a mi proyecto. ¡Muchas gracias!";

const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
  mensajeWhatsApp,
)}`;

export default function CarruselEjemplos() {
  const [activo, setActivo] = useState(0);
  const [imagenAmpliada, setImagenAmpliada] = useState(false);

  const touchInicioX = useRef<number | null>(null);
  const touchInicioY = useRef<number | null>(null);
  const fueDeslizamiento = useRef(false);

  const cantidad = ejemplos.length;
  const ejemploActivo = ejemplos[activo];

  useEffect(() => {
    if (!imagenAmpliada) return;

    const cerrarConEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setImagenAmpliada(false);
      }
    };

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", cerrarConEscape);

    return () => {
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener("keydown", cerrarConEscape);
    };
  }, [imagenAmpliada]);

  const anterior = () => {
    setActivo((actual) => (actual - 1 + cantidad) % cantidad);
  };

  const siguiente = () => {
    setActivo((actual) => (actual + 1) % cantidad);
  };

  const obtenerPosicion = (indice: number) => {
    const diferencia = (indice - activo + cantidad) % cantidad;

    if (diferencia === 0) return "centro";
    if (diferencia === 1) return "derecha";
    if (diferencia === cantidad - 1) return "izquierda";

    return "oculto";
  };

  const abrirImagenEnCelular = () => {
    if (
      !fueDeslizamiento.current &&
      window.matchMedia("(max-width: 560px)").matches
    ) {
      setImagenAmpliada(true);
    }
  };

  const iniciarDeslizamiento = (
    event: React.TouchEvent<HTMLDivElement>,
  ) => {
    const toque = event.touches[0];

    touchInicioX.current = toque.clientX;
    touchInicioY.current = toque.clientY;
    fueDeslizamiento.current = false;
  };

  const moverDeslizamiento = (
    event: React.TouchEvent<HTMLDivElement>,
  ) => {
    if (touchInicioX.current === null || touchInicioY.current === null) {
      return;
    }

    const toque = event.touches[0];
    const diferenciaX = toque.clientX - touchInicioX.current;
    const diferenciaY = toque.clientY - touchInicioY.current;

    if (
      Math.abs(diferenciaX) > 10 &&
      Math.abs(diferenciaX) > Math.abs(diferenciaY)
    ) {
      fueDeslizamiento.current = true;
    }
  };

  const terminarDeslizamiento = (
    event: React.TouchEvent<HTMLDivElement>,
  ) => {
    if (touchInicioX.current === null || touchInicioY.current === null) {
      return;
    }

    const toqueFinal = event.changedTouches[0];
    const diferenciaX = toqueFinal.clientX - touchInicioX.current;
    const diferenciaY = toqueFinal.clientY - touchInicioY.current;

    touchInicioX.current = null;
    touchInicioY.current = null;

    const esDeslizamientoHorizontal =
      Math.abs(diferenciaX) >= 35 &&
      Math.abs(diferenciaX) > Math.abs(diferenciaY);

    if (!esDeslizamientoHorizontal) {
      fueDeslizamiento.current = false;
      return;
    }

    fueDeslizamiento.current = true;

    if (diferenciaX < 0) {
      siguiente();
    } else {
      anterior();
    }

    window.setTimeout(() => {
      fueDeslizamiento.current = false;
    }, 120);
  };

  return (
    <>
      <div className={styles.carrusel}>
        <div
          className={styles.escenario}
          onTouchStart={iniciarDeslizamiento}
          onTouchMove={moverDeslizamiento}
          onTouchEnd={terminarDeslizamiento}
        >
          {ejemplos.map((ejemplo, indice) => {
            const posicion = obtenerPosicion(indice);

            return (
              <button
                type="button"
                key={ejemplo.id}
                className={`${styles.tarjeta} ${styles[posicion]}`}
                onClick={() => {
                  if (fueDeslizamiento.current) return;

                  if (posicion === "izquierda") anterior();
                  if (posicion === "derecha") siguiente();
                  if (posicion === "centro") abrirImagenEnCelular();
                }}
                aria-label={
                  posicion === "centro"
                    ? `Abrir ejemplo ${indice + 1}`
                    : `Mostrar ejemplo ${indice + 1}`
                }
                tabIndex={posicion === "oculto" ? -1 : 0}
              >
                <Image
                  src={ejemplo.imagen}
                  alt={ejemplo.alt}
                  width={1536}
                  height={1024}
                  className={styles.imagen}
                  priority={indice < 3}
                  draggable={false}
                />
              </button>
            );
          })}

          <button
            type="button"
            className={`${styles.flecha} ${styles.flechaIzquierda}`}
            onClick={anterior}
            aria-label="Ver ejemplo anterior"
          >
            <ChevronLeft size={28} strokeWidth={1.8} />
          </button>

          <button
            type="button"
            className={`${styles.flecha} ${styles.flechaDerecha}`}
            onClick={siguiente}
            aria-label="Ver ejemplo siguiente"
          >
            <ChevronRight size={28} strokeWidth={1.8} />
          </button>
        </div>

        <p className={styles.aviso}>
          <strong>⚠ Aviso:</strong> Los valores mostrados en estos ejemplos son
          únicamente ilustrativos y no representan un presupuesto real.
        </p>

        <div className={styles.indicadores} aria-label="Ejemplos disponibles">
          {ejemplos.map((ejemplo, indice) => (
            <button
              type="button"
              key={ejemplo.id}
              className={`${styles.indicador} ${
                indice === activo ? styles.indicadorActivo : ""
              }`}
              onClick={() => setActivo(indice)}
              aria-label={`Ir al ejemplo ${indice + 1}`}
            />
          ))}
        </div>

        <p className={styles.contador}>
          {String(activo + 1).padStart(2, "0")}
          <span>/</span>
          {String(cantidad).padStart(2, "0")}
        </p>

        <div className={styles.cta}>
          <a
            href={enlaceWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            <MessageCircle size={20} strokeWidth={2} />
            <span>Cotizar mi proyecto</span>
          </a>
        </div>
      </div>

      {imagenAmpliada && (
        <div
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-label="Ejemplo ampliado"
          onClick={() => setImagenAmpliada(false)}
        >
          <button
            type="button"
            className={styles.cerrarModal}
            onClick={() => setImagenAmpliada(false)}
            aria-label="Cerrar imagen ampliada"
          >
            <X size={22} strokeWidth={2} />
          </button>

          <div
            className={styles.modalContenido}
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={ejemploActivo.imagen}
              alt={ejemploActivo.alt}
              width={1536}
              height={1024}
              className={styles.imagenAmpliada}
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}