import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Cards from "../../../components/Cards";
import { quitarFavorito, listarFavoritos } from "../../../services/favoritosService";
import "./Favoritos.css";

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [idEnProceso, setIdEnProceso] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    listarFavoritos()
      .then((lista) => {
        if (!Array.isArray(lista)) {
          throw new Error("La respuesta de favoritos no tiene el formato esperado.");
        }
        if (activo) setFavoritos(lista);
      })
      .catch((loadError) => {
        if (activo) {
          setError(loadError.message || "No se pudieron cargar tus favoritos.");
        }
      })
      .finally(() => {
        if (activo) setCargando(false);
      });

    return () => {
      activo = false;
    };
  }, []);

  const eliminarDeFavoritos = async (id) => {
    setIdEnProceso(String(id));
    setError("");
    try {
      await quitarFavorito(id);
      setFavoritos((actuales) =>
        actuales.filter((propiedad) => String(propiedad.id) !== String(id)),
      );
    } catch (removeError) {
      setError(removeError.message || "No se pudo quitar la propiedad de favoritos.");
    } finally {
      setIdEnProceso(null);
    }
  };

  return (
    <main className="favorites-page">
      <div className="favorites-shell">
        <header className="favorites-heading">
          <div>
            <span className="favorites-eyebrow">
              INNOVAPROP <span>/</span> TU LISTA PERSONAL
            </span>
            <h1>Mis favoritos</h1>
            <p>Guardá las propiedades que te interesan y volvé a ellas cuando quieras.</p>
          </div>
          <Link className="favorites-browse-link" to="/propiedades">
            Explorar propiedades
          </Link>
        </header>

        {error && (
          <p className="favorites-feedback favorites-error" role="alert">
            {error}
          </p>
        )}

        {cargando ? (
          <div className="favorites-feedback" role="status">
            Cargando tus favoritos...
          </div>
        ) : favoritos.length > 0 ? (
          <>
            <p className="favorites-count">
              {favoritos.length} {favoritos.length === 1 ? "propiedad guardada" : "propiedades guardadas"}
            </p>
            <div className="favorites-grid">
              {favoritos.map((propiedad) => (
                <div className="favorites-card" key={propiedad.id}>
                  <Cards
                    id={propiedad.id}
                    titulo={propiedad.titulo}
                    tipo={propiedad.tipo}
                    operacion={propiedad.operacion}
                    precio={propiedad.precio}
                    moneda={propiedad.moneda}
                    ubicacion={propiedad.ubicacion}
                    descripcion={propiedad.descripcion}
                    imagen={propiedad.imagen}
                    favorito
                    favoritoEnProceso={idEnProceso === String(propiedad.id)}
                    onAlternarFavorito={() => eliminarDeFavoritos(propiedad.id)}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <section className="favorites-empty">
            <span className="favorites-empty-icon">
              <Heart size={25} />
            </span>
            <h2>Todavía no guardaste propiedades</h2>
            <p>Usá el corazón en una propiedad para agregarla a esta lista.</p>
            <Link className="favorites-browse-link" to="/propiedades">
              Ver propiedades
            </Link>
          </section>
        )}
      </div>
    </main>
  );
};

export default Favoritos;
