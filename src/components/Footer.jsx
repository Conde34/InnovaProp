import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import "./Footer.css";


const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <Container>
          <Row className="gy-4">

            <Col xs={12} md={4}>
              <h3 className="footer-logo">
                Innova<span>PROP</span>
              </h3>
              <p>
                Encontrá el lugar ideal para vos. Te acompañamos en cada paso
                para encontrar tu próximo hogar.
              </p>
            </Col>

            <Col xs={12} sm={6} md={3}>
              <h5>Contacto</h5>

              <p>
                <FaPhone /> +54 381 555-5555
              </p>

              <p>
                <FaEnvelope /> contacto@innovaprop.com
              </p>

              <p>
                <FaMapMarkerAlt /> Tucumán, Argentina
              </p>
            </Col>

            <Col xs={12} sm={6} md={2}>
              <h5>Seguinos</h5>

              <div className="footer-social">
                <a href="#" aria-label="Instagram">
                  <FaInstagram />
                </a>

                <a href="#" aria-label="Facebook">
                  <FaFacebook />
                </a>

                <a href="#" aria-label="WhatsApp">
                  <FaWhatsapp />
                </a>
              </div>
            </Col>

            <Col xs={12} md={3}>
              <h5>Información</h5>

              <ul className="footer-links">
                <li>
                  <a href="/terminos">Términos y condiciones</a>
                </li>
                <li>
                  <a href="/privacidad">Política de privacidad</a>
                </li>
                <li>
                  <a href="/nosotros">Sobre nosotros</a>
                </li>
                <li>
                  <a href="/contacto">Contacto</a>
                </li>
              </ul>
            </Col>
          </Row>

          <hr />

          <div className="footer-bottom">
            <p>
              © {new Date().getFullYear()} Innova PROP. Todos los derechos
              reservados.
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
