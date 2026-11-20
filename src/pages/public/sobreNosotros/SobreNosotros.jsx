import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../sobreNosotros/SobreNosotros.css";

/* ---------- Datos editables (reemplazá por los reales) ---------- */

const EDIFICIOS = [
  { ancho: 70, filas: 7, cols: 3 },
  { ancho: 92, filas: 11, cols: 4 },
  { ancho: 60, filas: 5, cols: 3 },
  { ancho: 112, filas: 14, cols: 5 },
  { ancho: 80, filas: 9, cols: 3 },
  { ancho: 66, filas: 6, cols: 3 },
  { ancho: 96, filas: 12, cols: 4 },
];

const ESTADISTICAS = [
  { valor: 480, sufijo: "+", texto: "propiedades gestionadas" },
  { valor: 1200, sufijo: "+", texto: "familias asesoradas" },
  { valor: 98, sufijo: "%", texto: "de clientes que nos recomiendan" },
];

const PESTANIAS = [
  {
    id: "mision",
    nombre: "Misión",
    titulo: "Que comprar, vender o alquilar sea claro.",
    texto:
      "Acompañamos cada operación con asesores reales y con herramientas que muestran el estado de cada propiedad sin letra chica. Si algo cambia, lo ves en el mapa.",
  },
  {
    id: "vision",
    nombre: "Visión",
    titulo: "Una inmobiliaria que se entiende al primer vistazo.",
    texto:
      "Queremos que cualquier persona pueda recorrer una propiedad, comparar opciones y decidir con confianza, sin depender de llamadas ni de visitas innecesarias.",
  },
  {
    id: "valores",
    nombre: "Valores",
    titulo: "Transparencia, cercanía y tecnología útil.",
    texto:
      "Decimos el estado real de cada propiedad, respondemos rápido y usamos tecnología solo cuando le ahorra tiempo a quien busca su lugar.",
  },
];

const SEMAFORO = [
  {
    color: "verde",
    titulo: "Disponible",
    texto: "Se puede visitar y negociar hoy.",
  },
  {
    color: "amarillo",
    titulo: "En negociación",
    texto: "Hay una oferta en curso. Podés dejar tu interés.",
  },
  {
    color: "rojo",
    titulo: "Reservada o vendida",
    texto: "Ya tiene dueño. Te mostramos alternativas parecidas.",
  },
];

const EQUIPO = [
  { nombre: "Camila Rojas", rol: "Dirección y estrategia", iniciales: "CR" },
  { nombre: "Matías Herrera", rol: "Asesor comercial", iniciales: "MH" },
  { nombre: "Lucía Paz", rol: "Tasaciones y legales", iniciales: "LP" },
  { nombre: "Tomás Vega", rol: "Tecnología y producto", iniciales: "TV" },
];

const PREGUNTAS = [
  {
    p: "¿Cómo sé si una propiedad sigue disponible?",
    r: "Cada propiedad tiene un color de semáforo en el mapa y en su ficha. Se actualiza cuando cambia su estado.",
  },
  {
    p: "¿Puedo conocer la propiedad sin ir?",
    r: "Sí. Con las fotos de la propiedad armamos una visita guiada y podés verla amoblada o sin amoblar.",
  },
  {
    p: "¿En qué moneda se publican los precios?",
    r: "En pesos o en dólares, según lo que defina cada propietario. Siempre se indica en la ficha.",
  },
  {
    p: "¿Cómo hablo con un asesor?",
    r: "Desde la sección de contacto o desde la ficha de cualquier propiedad. Te respondemos por el medio que elijas.",
  },
];

/* ---------- Componentes auxiliares ---------- */

function Skyline() {
  return (
    <div className="sn-skyline" aria-hidden="true">
      {EDIFICIOS.map((e, b) => (
        <div
          key={b}
          className="sn-edificio"
          style={{
            width: e.ancho,
            gridTemplateColumns: `repeat(${e.cols}, 1fr)`,
          }}
        >
          {Array.from({ length: e.filas * e.cols }, (_, i) => {
            const encendida = (i + b * 2) % 3 !== 0;
            const demora = `${((i * 37 + b * 91) % 23) * 0.11 + 0.4}s`;
            return (
              <span
                key={i}
                className={
                  encendida ? "sn-ventana sn-ventana--on" : "sn-ventana"
                }
                style={{ "--d": demora }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

function Contador({ hasta, sufijo, activo }) {
  const [valor, setValor] = useState(0);

  useEffect(() => {
    if (!activo) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValor(hasta);
      return;
    }
    const inicio = performance.now();
    let id;
    const paso = (ahora) => {
      const t = Math.min((ahora - inicio) / 1600, 1);
      setValor(Math.round(hasta * (1 - Math.pow(1 - t, 3))));
      if (t < 1) id = requestAnimationFrame(paso);
    };
    id = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(id);
  }, [activo, hasta]);

  return (
    <>
      {valor.toLocaleString("es-AR")}
      <span className="sn-sufijo">{sufijo}</span>
    </>
  );
}

/* ---------- Página ---------- */

const SobreNosotros = () => {
  const [pestania, setPestania] = useState("mision");
  const [abierta, setAbierta] = useState(0);
  const [statsActivas, setStatsActivas] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setStatsActivas(true);
          observador.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  const actual = PESTANIAS.find((t) => t.id === pestania);

  return (
    <main className="sn-pagina">
      {/* Hero */}
      <section className="sn-hero">
        <div className="sn-hero__texto">
          <h1>Cada propiedad, a la vista y sin vueltas.</h1>
          <p>
            InnovaProp combina asesores de carne y hueso con tecnología que
            muestra el estado real de cada propiedad en el mapa, antes de que
            salgas de casa.
          </p>
          <div className="sn-botones">
            <Link to="/propiedades" className="sn-boton sn-boton--primario">
              Ver propiedades
            </Link>
            <Link to="/contacto" className="sn-boton sn-boton--fantasma">
              Hablar con un asesor
            </Link>
          </div>
        </div>
        <Skyline />
      </section>

      {/* Estadísticas */}
      <section className="sn-seccion sn-stats" ref={statsRef}>
        {ESTADISTICAS.map((s) => (
          <div className="sn-stat" key={s.texto}>
            <strong>
              <Contador
                hasta={s.valor}
                sufijo={s.sufijo}
                activo={statsActivas}
              />
            </strong>
            <span>{s.texto}</span>
          </div>
        ))}
      </section>

      {/* Misión, visión y valores */}
      <section className="sn-seccion sn-mvv">
        <h2>Qué nos mueve</h2>
        <div className="sn-mvv__cuerpo">
          <div
            className="sn-tabs"
            role="tablist"
            aria-label="Misión, visión y valores"
          >
            {PESTANIAS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={pestania === t.id}
                className={
                  pestania === t.id ? "sn-tab sn-tab--activa" : "sn-tab"
                }
                onClick={() => setPestania(t.id)}
              >
                {t.nombre}
              </button>
            ))}
          </div>
          <div className="sn-panel" role="tabpanel" key={actual.id}>
            <h3>{actual.titulo}</h3>
            <p>{actual.texto}</p>
          </div>
        </div>
      </section>

      {/* Semáforo */}
      <section className="sn-seccion sn-semaforo">
        <div className="sn-semaforo__intro">
          <h2>Un semáforo para cada propiedad</h2>
          <p>
            Dejamos de adivinar si algo sigue en pie. El color que ves en el
            mapa es el estado real de la propiedad.
          </p>
        </div>
        <ul className="sn-semaforo__lista">
          {SEMAFORO.map((s) => (
            <li key={s.color}>
              <span
                className={`sn-luz sn-luz--${s.color}`}
                aria-hidden="true"
              />
              <div>
                <h3>{s.titulo}</h3>
                <p>{s.texto}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Preguntas frecuentes */}
      <section className="sn-seccion sn-faq">
        <h2>Preguntas frecuentes</h2>
        <div className="sn-faq__lista">
          {PREGUNTAS.map((item, i) => {
            const abierto = abierta === i;
            return (
              <div
                className={abierto ? "sn-item sn-item--abierto" : "sn-item"}
                key={item.p}
              >
                <button
                  className="sn-item__pregunta"
                  aria-expanded={abierto}
                  onClick={() => setAbierta(abierto ? null : i)}
                >
                  {item.p}
                  <span className="sn-item__mas" aria-hidden="true" />
                </button>
                <div className="sn-item__respuesta">
                  <p>{item.r}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cierre */}
      <section className="sn-seccion sn-cierre">
        <div className="sn-cierre__panel">
          <h2>Encontremos tu lugar.</h2>
          <p>
            Contanos qué buscás y un asesor te responde con opciones reales.
          </p>
          <Link to="/contacto" className="sn-boton sn-boton--oscuro">
            Hablar con un asesor
          </Link>
        </div>
      </section>
    </main>
  );
}


export default SobreNosotros;