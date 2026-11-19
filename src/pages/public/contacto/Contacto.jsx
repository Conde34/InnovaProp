
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaClock,
} from "react-icons/fa";
import "./Contacto.css";

const CLAVE_STORAGE = "innovaprop_consultas";
const MAX_MENSAJE = 500;

const MOTIVOS = [
  "Quiero comprar una propiedad",
  "Quiero alquilar una propiedad",
  "Quiero tasar mi propiedad",
  "Quiero publicar mi propiedad",
  "Otra consulta",
];

const VALORES_INICIALES = {
  nombre: "",
  email: "",
  telefono: "",
  motivo: "",
  mensaje: "",
};

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_TELEFONO = /^[0-9+\-()\s]{8,20}$/;

// Devuelve un objeto con un mensaje por cada campo inválido.
const validar = (valores) => {
  const errores = {};

  if (valores.nombre.trim().length < 2) {
    errores.nombre = "Ingresá tu nombre (mínimo 2 caracteres).";
  }

  if (!REGEX_EMAIL.test(valores.email.trim())) {
    errores.email = "Ingresá un email válido, por ejemplo nombre@correo.com.";
  }

  // El teléfono es opcional, pero si lo completan tiene que ser válido.
  if (valores.telefono.trim() && !REGEX_TELEFONO.test(valores.telefono.trim())) {
    errores.telefono = "Ingresá un teléfono válido (solo números, +, - y paréntesis).";
  }

  if (!valores.motivo) {
    errores.motivo = "Elegí el motivo de tu consulta.";
  }

  if (valores.mensaje.trim().length < 10) {
    errores.mensaje = "Contanos un poco más (mínimo 10 caracteres).";
  }

  return errores;
};

// Sin backend: las consultas se guardan en el navegador para poder
// mostrarlas más adelante en el panel o el dashboard.
const guardarConsulta = (valores) => {
  try {
    const guardadas = JSON.parse(localStorage.getItem(CLAVE_STORAGE)) || [];
    guardadas.push({
      id: Date.now(),
      ...valores,
      fecha: new Date().toISOString(),
    });
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(guardadas));
  } catch {
    // Si el almacenamiento no está disponible, el formulario igual funciona.
  }
};

const Contacto = () => {
  const [valores, setValores] = useState(VALORES_INICIALES);
  const [errores, setErrores] = useState({});
  const [intentado, setIntentado] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nuevos = { ...valores, [name]: value };
    setValores(nuevos);
    setEnviado(false);

    // Una vez que intentó enviar, se revalida mientras escribe.
    if (intentado) {
      setErrores(validar(nuevos));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIntentado(true);

    const erroresNuevos = validar(valores);
    setErrores(erroresNuevos);

    if (Object.keys(erroresNuevos).length > 0) {
      setEnviado(false);
      return;
    }

    guardarConsulta({
      ...valores,
      nombre: valores.nombre.trim(),
      email: valores.email.trim(),
      telefono: valores.telefono.trim(),
      mensaje: valores.mensaje.trim(),
    });

    setValores(VALORES_INICIALES);
    setErrores({});
    setIntentado(false);
    setEnviado(true);
  };

  return (
    <main className="ct-pagina">
      <Container className="ct-contenedor">
        <header className="ct-encabezado">
          <span className="ct-etiqueta">Contacto</span>
          <h1>Hablemos de tu próximo hogar</h1>
          <p>
            Dejanos tu consulta y un asesor se comunica con vos a la brevedad.
          </p>
        </header>

        <Row className="gy-4">
          {/* DATOS DE CONTACTO */}
          <Col xs={12} lg={5}>
            <aside className="ct-tarjeta ct-info">
              <h2>Datos de contacto</h2>

              <ul className="ct-lista">
                <li>
                  <FaPhone aria-hidden="true" />
                  <div>
                    <strong>Teléfono</strong>
                    <span>+54 381 555-5555</span>
                  </div>
                </li>
                <li>
                  <FaEnvelope aria-hidden="true" />
                  <div>
                    <strong>Email</strong>
                    <span>contacto@innovaprop.com</span>
                  </div>
                </li>
                <li>
                  <FaMapMarkerAlt aria-hidden="true" />
                  <div>
                    <strong>Ubicación</strong>
                    <span>Tucumán, Argentina</span>
                  </div>
                </li>
                <li>
                  <FaClock aria-hidden="true" />
                  <div>
                    <strong>Horario de atención</strong>
                    <span>Lunes a viernes, de 9 a 18 hs</span>
                  </div>
                </li>
              </ul>

              <a
                className="ct-whatsapp"
                href="https://wa.me/543815555555"
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp aria-hidden="true" /> Escribinos por WhatsApp
              </a>
            </aside>
          </Col>

          {/* FORMULARIO */}
          <Col xs={12} lg={7}>
            <section className="ct-tarjeta">
              <h2>Envianos tu consulta</h2>

              {enviado && (
                <Alert variant="success" className="ct-alerta" role="status">
                  ¡Gracias! Recibimos tu consulta y te vamos a responder muy
                  pronto.
                </Alert>
              )}

              <Form noValidate onSubmit={handleSubmit}>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3" controlId="ct-nombre">
                      <Form.Label>Nombre y apellido</Form.Label>
                      <Form.Control
                        type="text"
                        name="nombre"
                        placeholder="Tu nombre"
                        value={valores.nombre}
                        onChange={handleChange}
                        isInvalid={!!errores.nombre}
                        autoComplete="name"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errores.nombre}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3" controlId="ct-email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="nombre@correo.com"
                        value={valores.email}
                        onChange={handleChange}
                        isInvalid={!!errores.email}
                        autoComplete="email"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errores.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3" controlId="ct-telefono">
                      <Form.Label>
                        Teléfono <span className="ct-opcional">(opcional)</span>
                      </Form.Label>
                      <Form.Control
                        type="tel"
                        name="telefono"
                        placeholder="381 555-5555"
                        value={valores.telefono}
                        onChange={handleChange}
                        isInvalid={!!errores.telefono}
                        autoComplete="tel"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errores.telefono}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3" controlId="ct-motivo">
                      <Form.Label>Motivo de la consulta</Form.Label>
                      <Form.Select
                        name="motivo"
                        value={valores.motivo}
                        onChange={handleChange}
                        isInvalid={!!errores.motivo}
                      >
                        <option value="">Seleccioná una opción</option>
                        {MOTIVOS.map((motivo) => (
                          <option key={motivo} value={motivo}>
                            {motivo}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errores.motivo}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4" controlId="ct-mensaje">
                  <Form.Label>Mensaje</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="mensaje"
                    placeholder="Contanos qué estás buscando…"
                    maxLength={MAX_MENSAJE}
                    value={valores.mensaje}
                    onChange={handleChange}
                    isInvalid={!!errores.mensaje}
                  />
                  <div className="ct-contador">
                    {valores.mensaje.length}/{MAX_MENSAJE}
                  </div>
                  <Form.Control.Feedback type="invalid">
                    {errores.mensaje}
                  </Form.Control.Feedback>
                </Form.Group>

                <button type="submit" className="ct-boton">
                  Enviar consulta
                </button>
              </Form>
            </section>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Contacto;