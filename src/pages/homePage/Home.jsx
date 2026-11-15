import { Container, Row, Col } from "react-bootstrap";
import Cards from "../../components/Cards";
import { useEffect, useState } from "react";
import "./Home.css"; // Importamos los estilos de la paginación

const Home = () => {
  const [propiedades, setPropiedades] = useState([]);

  // Estados para la paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const propiedadesPorPagina = 6; // 6 tarjetas por página

  const casas = [
    {
      id: 1,
      titulo: "Casa moderna en zona norte",
      tipo: "Casa",
      operacion: "Venta",
      precio: 125000,
      moneda: "USD",
      ubicacion: "Yerba Buena, Tucumán",
      direccion: "Av. Aconquija 1200",
      ambientes: 4,
      dormitorios: 3,
      banos: 2,
      superficie: 180,
      imagen: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      descripcion: "Casa moderna con amplio jardín y cochera.",
      disponible: true,
      destacado: true,
    },
    {
      id: 2,
      titulo: "Departamento céntrico",
      tipo: "Departamento",
      operacion: "Alquiler",
      precio: 450000,
      moneda: "ARS",
      ubicacion: "San Miguel de Tucumán",
      direccion: "Calle 25 de Mayo 450",
      ambientes: 3,
      dormitorios: 2,
      banos: 1,
      superficie: 75,
      imagen: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      descripcion: "Departamento luminoso cerca de comercios.",
      disponible: true,
      destacado: true,
    },
    {
      id: 3,
      titulo: "Terreno residencial",
      tipo: "Terreno",
      operacion: "Venta",
      precio: 35000,
      moneda: "USD",
      ubicacion: "Tafí Viejo, Tucumán",
      direccion: "Barrio Las Yungas",
      ambientes: 0,
      dormitorios: 0,
      banos: 0,
      superficie: 450,
      imagen: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
      descripcion: "Terreno ideal para construir una vivienda.",
      disponible: true,
      destacado: false,
    },
    {
      id: 4,
      titulo: "Casa familiar con pileta",
      tipo: "Casa",
      operacion: "Venta",
      precio: 180000,
      moneda: "USD",
      ubicacion: "Yerba Buena, Tucumán",
      direccion: "Los Ceibos 850",
      ambientes: 5,
      dormitorios: 4,
      banos: 3,
      superficie: 250,
      imagen: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      descripcion: "Amplia propiedad con pileta y quincho.",
      disponible: true,
      destacado: true,
    },
    {
      id: 5,
      titulo: "Local comercial céntrico",
      tipo: "Local",
      operacion: "Alquiler",
      precio: 600000,
      moneda: "ARS",
      ubicacion: "San Miguel de Tucumán",
      direccion: "San Martín 320",
      ambientes: 2,
      dormitorios: 0,
      banos: 1,
      superficie: 90,
      imagen: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
      descripcion: "Local comercial en zona de alto tránsito.",
      disponible: true,
      destacado: false,
    },
    {
      id: 6,
      titulo: "Departamento con balcón",
      tipo: "Departamento",
      operacion: "Venta",
      precio: 78000,
      moneda: "USD",
      ubicacion: "Barrio Norte, Tucumán",
      direccion: "Santa Fe 780",
      ambientes: 2,
      dormitorios: 1,
      banos: 1,
      superficie: 55,
      imagen: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      descripcion: "Departamento con balcón y excelente iluminación.",
      disponible: true,
      destacado: false,
    },
    {
      id: 7,
      titulo: "Casa en barrio privado",
      tipo: "Casa",
      operacion: "Alquiler",
      precio: 900000,
      moneda: "ARS",
      ubicacion: "Yerba Buena, Tucumán",
      direccion: "Country Las Pirámides",
      ambientes: 5,
      dormitorios: 3,
      banos: 2,
      superficie: 200,
      imagen: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      descripcion: "Casa en barrio privado con seguridad.",
      disponible: true,
      destacado: true,
    },
    {
      id: 8,
      titulo: "Terreno en zona residencial",
      tipo: "Terreno",
      operacion: "Venta",
      precio: 28000,
      moneda: "USD",
      ubicacion: "Tafí Viejo, Tucumán",
      direccion: "Villa Obrera",
      ambientes: 0,
      dormitorios: 0,
      banos: 0,
      superficie: 320,
      imagen: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
      descripcion: "Terreno con servicios disponibles.",
      disponible: true,
      destacado: false,
    },
    {
      id: 9,
      titulo: "Departamento premium",
      tipo: "Departamento",
      operacion: "Venta",
      precio: 145000,
      moneda: "USD",
      ubicacion: "San Miguel de Tucumán",
      direccion: "Av. Mate de Luna 900",
      ambientes: 4,
      dormitorios: 3,
      banos: 2,
      superficie: 110,
      imagen: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
      descripcion: "Departamento premium con terminaciones modernas.",
      disponible: true,
      destacado: true,
    },
    {
      id: 10,
      titulo: "Casa económica",
      tipo: "Casa",
      operacion: "Venta",
      precio: 65000,
      moneda: "USD",
      ubicacion: "Banda del Río Salí, Tucumán",
      direccion: "Av. Independencia 150",
      ambientes: 3,
      dormitorios: 2,
      banos: 1,
      superficie: 100,
      imagen: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
      descripcion: "Casa familiar con patio y cochera.",
      disponible: true,
      destacado: false,
    },
    {
      id: 11,
      titulo: "Departamento monoambiente",
      tipo: "Departamento",
      operacion: "Alquiler",
      precio: 280000,
      moneda: "ARS",
      ubicacion: "San Miguel de Tucumán",
      direccion: "Córdoba 500",
      ambientes: 1,
      dormitorios: 0,
      banos: 1,
      superficie: 35,
      imagen: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      descripcion: "Monoambiente ideal para estudiantes.",
      disponible: true,
      destacado: false,
    },
    {
      id: 12,
      titulo: "Casa quinta con pileta",
      tipo: "Casa",
      operacion: "Venta",
      precio: 210000,
      moneda: "USD",
      ubicacion: "El Manantial, Tucumán",
      direccion: "Camino del Perú 2000",
      ambientes: 6,
      dormitorios: 4,
      banos: 3,
      superficie: 350,
      imagen: "https://images.unsplash.com/photo-1600607687644-c7171b42498f",
      descripcion: "Casa quinta con amplio parque y pileta.",
      disponible: true,
      destacado: true,
    },
    {
      id: 13,
      titulo: "Local comercial amplio",
      tipo: "Local",
      operacion: "Venta",
      precio: 110000,
      moneda: "USD",
      ubicacion: "Tafí Viejo, Tucumán",
      direccion: "Av. Alem 600",
      ambientes: 3,
      dormitorios: 0,
      banos: 1,
      superficie: 130,
      imagen: "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
      descripcion: "Local con salón principal y depósito.",
      disponible: true,
      destacado: false,
    },
    {
      id: 14,
      titulo: "Departamento con terraza",
      tipo: "Departamento",
      operacion: "Alquiler",
      precio: 550000,
      moneda: "ARS",
      ubicacion: "Yerba Buena, Tucumán",
      direccion: "Av. Perón 1100",
      ambientes: 3,
      dormitorios: 2,
      banos: 2,
      superficie: 85,
      imagen: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      descripcion: "Departamento moderno con terraza privada.",
      disponible: true,
      destacado: true,
    },
    {
      id: 15,
      titulo: "Terreno comercial",
      tipo: "Terreno",
      operacion: "Venta",
      precio: 55000,
      moneda: "USD",
      ubicacion: "San Miguel de Tucumán",
      direccion: "Av. Roca 1800",
      ambientes: 0,
      dormitorios: 0,
      banos: 0,
      superficie: 600,
      imagen: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
      descripcion: "Terreno apto para desarrollo comercial.",
      disponible: true,
      destacado: false,
    },
    {
      id: 16,
      titulo: "Casa de dos plantas",
      tipo: "Casa",
      operacion: "Venta",
      precio: 135000,
      moneda: "USD",
      ubicacion: "Tafí Viejo, Tucumán",
      direccion: "Av. Constitución 750",
      ambientes: 5,
      dormitorios: 3,
      banos: 2,
      superficie: 190,
      imagen: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
      descripcion: "Casa de dos plantas con cochera y patio.",
      disponible: true,
      destacado: false,
    },
    {
      id: 17,
      titulo: "Departamento amoblado",
      tipo: "Departamento",
      operacion: "Alquiler",
      precio: 650000,
      moneda: "ARS",
      ubicacion: "Barrio Norte, Tucumán",
      direccion: "Junín 650",
      ambientes: 2,
      dormitorios: 1,
      banos: 1,
      superficie: 50,
      imagen: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
      descripcion: "Departamento totalmente amoblado.",
      disponible: true,
      destacado: false,
    },
    {
      id: 18,
      titulo: "Casa con amplio jardín",
      tipo: "Casa",
      operacion: "Venta",
      precio: 95000,
      moneda: "USD",
      ubicacion: "Lules, Tucumán",
      direccion: "Belgrano 400",
      ambientes: 4,
      dormitorios: 3,
      banos: 2,
      superficie: 160,
      imagen: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      descripcion: "Casa familiar rodeada de espacios verdes.",
      disponible: true,
      destacado: false,
    },
    {
      id: 19,
      titulo: "Local comercial pequeño",
      tipo: "Local",
      operacion: "Alquiler",
      precio: 350000,
      moneda: "ARS",
      ubicacion: "San Miguel de Tucumán",
      direccion: "Maipú 300",
      ambientes: 1,
      dormitorios: 0,
      banos: 1,
      superficie: 45,
      imagen: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
      descripcion: "Local ideal para emprendimientos.",
      disponible: true,
      destacado: false,
    },
    {
      id: 20,
      titulo: "Casa de categoría",
      tipo: "Casa",
      operacion: "Venta",
      precio: 250000,
      moneda: "USD",
      ubicacion: "Yerba Buena, Tucumán",
      direccion: "Country Jockey Club",
      ambientes: 6,
      dormitorios: 4,
      banos: 3,
      superficie: 300,
      imagen: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      descripcion: "Propiedad de categoría con piscina y quincho.",
      disponible: true,
      destacado: true,
    },
  ];

  useEffect(() => {
    localStorage.setItem("propiedades", JSON.stringify(casas));
    setPropiedades(casas);
  }, []);

  // Lógica de Paginación
  const indiceUltimoItem = paginaActual * propiedadesPorPagina;
  const indicePrimerItem = indiceUltimoItem - propiedadesPorPagina;
  const propiedadesVisibles = propiedades.slice(
    indicePrimerItem,
    indiceUltimoItem,
  );
  const totalPaginas = Math.ceil(propiedades.length / propiedadesPorPagina);

  const siguientePagina = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
  };

  const paginaAnterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  return (
    <div className="my-5">
      <Container>
        {/* Grilla con separación g-4 */}
        <Row className="g-4">
          {propiedadesVisibles.map((propiedad) => (
            <Col
              sm={12}
              md={6}
              lg={4}
              key={propiedad.id}
              className="d-flex justify-content-center"
            >
              <Cards
                titulo={propiedad.titulo}
                tipo={propiedad.tipo}
                operacion={propiedad.operacion}
                precio={propiedad.precio}
                moneda={propiedad.moneda}
                ubicacion={propiedad.ubicacion}
                descripcion={propiedad.descripcion}
                imagen={propiedad.imagen}
              />
            </Col>
          ))}
        </Row>

        {/* Controles de Paginación con diseño CSS externo */}
        <div className="pagination-container">
          <button
            className="pagination-btn"
            onClick={paginaAnterior}
            disabled={paginaActual === 1}
          >
            Anterior
          </button>

          <span className="pagination-info">
            Página {paginaActual} de {totalPaginas}
          </span>

          <button
            className="pagination-btn"
            onClick={siguientePagina}
            disabled={paginaActual === totalPaginas}
          >
            Siguiente
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Home;
