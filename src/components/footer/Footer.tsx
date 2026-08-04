import {
  BriefcaseBusiness,
  MessageCircle,
  MonitorSmartphone,
  PaintRoller,
  ShoppingBag,
  Smartphone,
  Waves,
} from "lucide-react";
import Image from "next/image";
import styles from "./Footer.module.css";

const herramientas = [
  {
    nombre: "Páginas web",
    icono: MonitorSmartphone,
  },
  {
    nombre: "Catálogo inteligente",
    icono: ShoppingBag,
  },
  {
    nombre: "Calculadora de pintura",
    icono: PaintRoller,
  },
  {
    nombre: "Calculadora de piscina",
    icono: Waves,
  },
  {
    nombre: "Appweb instalable",
    icono: Smartphone,
  },
  {
    nombre: "WhatsApp integrado",
    icono: MessageCircle,
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.brandHeader}>
              <Image
                src="/logo/logo.png"
                alt="Logo de WebCreator"
                width={150}
                height={150}
                className={styles.logo}
              />

              <div className={styles.brandText}>
                <strong>
                  webcreator<span>.ar</span>
                </strong>

                <small>CREADORES WEB</small>
              </div>
            </div>

            <p className={styles.description}>
              Desarrollamos herramientas digitales que ayudan a tu negocio a
              vender más y crecer todos los días.
            </p>
          </div>

          <div className={styles.tools}>
            <span className={styles.columnTitle}>HERRAMIENTAS</span>
            <span className={styles.titleLine} aria-hidden="true" />

            <ul>
              {herramientas.map(({ nombre, icono: Icono }) => (
                <li key={nombre}>
                  <Icono size={22} strokeWidth={1.8} />
                  <span>{nombre}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.contact}>
            <span className={styles.contactIcon}>
              <MessageCircle size={26} strokeWidth={1.8} />
            </span>

            <h3>
              ¿Listo para llevar tu negocio al{" "}
              <span>siguiente nivel?</span>
            </h3>

            <p>
              Contanos cómo es tu negocio y preparamos una propuesta adaptada a
              tu proyecto.
            </p>
          </div>
        </div>

        <div className={styles.divider} aria-hidden="true">
          <span />
        </div>

        <div className={styles.bottom}>
          <p>© 2026 webcreator.ar · Todos los derechos reservados</p>

          <p>
            Hecho con <span>♡</span> en Argentina
          </p>
        </div>
      </div>
    </footer>
  );
}