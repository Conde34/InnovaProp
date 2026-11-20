CREATE DATABASE IF NOT EXISTS innovaprop
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE innovaprop;

CREATE TABLE usuarios (
  id_usuario     INT AUTO_INCREMENT PRIMARY KEY,
  nombre         VARCHAR(60)  NOT NULL,
  apellido       VARCHAR(60)  NOT NULL,
  email          VARCHAR(120) NOT NULL UNIQUE,
  password_hash  VARCHAR(255) NOT NULL,
  telefono       VARCHAR(25),
  rol            ENUM('cliente','agente','admin') NOT NULL DEFAULT 'cliente',
  activo         BOOLEAN      NOT NULL DEFAULT TRUE,
  fecha_registro DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tipos_propiedad (
  id_tipo INT AUTO_INCREMENT PRIMARY KEY,
  nombre  VARCHAR(40) NOT NULL UNIQUE
);

CREATE TABLE zonas (
  id_zona INT AUTO_INCREMENT PRIMARY KEY,
  nombre  VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE propiedades (
  id_propiedad INT AUTO_INCREMENT PRIMARY KEY,
  titulo       VARCHAR(150)  NOT NULL,
  descripcion  TEXT,
  id_tipo      INT           NOT NULL,
  id_zona      INT           NOT NULL,
  operacion    ENUM('Venta','Alquiler') NOT NULL,
  precio       DECIMAL(12,2) NOT NULL,
  moneda       ENUM('USD','ARS')        NOT NULL DEFAULT 'USD',
  direccion    VARCHAR(150)  NOT NULL,
  latitud      DECIMAL(9,6),
  longitud     DECIMAL(9,6),
  ambientes    INT,
  dormitorios  INT,
  banos        INT,
  superficie   DECIMAL(8,2),
  estado       ENUM('Disponible','Reservada','Vendida','Alquilada') NOT NULL DEFAULT 'Disponible',
  destacado    BOOLEAN       NOT NULL DEFAULT FALSE,
  id_agente    INT           NOT NULL,
  fecha_alta   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_tipo)   REFERENCES tipos_propiedad(id_tipo),
  FOREIGN KEY (id_zona)   REFERENCES zonas(id_zona),
  FOREIGN KEY (id_agente) REFERENCES usuarios(id_usuario),
  CHECK (precio >= 0)
);

CREATE TABLE imagenes_propiedad (
  id_imagen    INT AUTO_INCREMENT PRIMARY KEY,
  id_propiedad INT          NOT NULL,
  url_imagen   VARCHAR(500) NOT NULL,
  es_principal BOOLEAN      NOT NULL DEFAULT FALSE,
  FOREIGN KEY (id_propiedad) REFERENCES propiedades(id_propiedad) ON DELETE CASCADE
);

CREATE TABLE consultas (
  id_consulta  INT AUTO_INCREMENT PRIMARY KEY,
  id_propiedad INT NULL,
  id_usuario   INT NULL,
  nombre       VARCHAR(100) NOT NULL,
  email        VARCHAR(120) NOT NULL,
  telefono     VARCHAR(25),
  motivo       VARCHAR(50)  NOT NULL,
  mensaje      TEXT         NOT NULL,
  estado       ENUM('Nueva','Contactada','Cerrada') NOT NULL DEFAULT 'Nueva',
  fecha        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_propiedad) REFERENCES propiedades(id_propiedad) ON DELETE SET NULL,
  FOREIGN KEY (id_usuario)   REFERENCES usuarios(id_usuario)      ON DELETE SET NULL
);

CREATE TABLE favoritos (
  id_favorito    INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario     INT      NOT NULL,
  id_propiedad   INT      NOT NULL,
  fecha_agregado DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (id_usuario, id_propiedad),
  FOREIGN KEY (id_usuario)   REFERENCES usuarios(id_usuario)      ON DELETE CASCADE,
  FOREIGN KEY (id_propiedad) REFERENCES propiedades(id_propiedad) ON DELETE CASCADE
);

INSERT INTO tipos_propiedad (nombre) VALUES ('Casa'),('Departamento'),('Terreno'),('Local');
INSERT INTO zonas (nombre) VALUES
  ('Yerba Buena'),('San Miguel de Tucumán'),('Tafí Viejo'),('Barrio Norte'),
  ('Banda del Río Salí'),('El Manantial'),('Lules');