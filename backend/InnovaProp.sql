-- InnovaProp - datos de prueba (corre DESPUES de innovaprop.sql)
USE innovaprop;

-- Usuarios de prueba (contraseña de los tres: 1234, guardada como hash bcrypt)
INSERT INTO usuarios (nombre, apellido, email, password_hash, telefono, rol) VALUES
  ('Admin','InnovaProp','admin@admin.com','$2b$10$uK6/AoNLoYkkLD2YNacGC.7eBCL1TXj./GQ314RDE/Pu/AIdRQCMK',NULL,'admin'),
  ('Agente','Demo','agente@agente.com','$2b$10$uK6/AoNLoYkkLD2YNacGC.7eBCL1TXj./GQ314RDE/Pu/AIdRQCMK',NULL,'agente'),
  ('Cliente','Demo','cliente@cliente.com','$2b$10$uK6/AoNLoYkkLD2YNacGC.7eBCL1TXj./GQ314RDE/Pu/AIdRQCMK',NULL,'cliente');

-- Las 20 propiedades del JSON, con el mismo id para no romper links del frontend
INSERT INTO propiedades (id_propiedad, titulo, descripcion, id_tipo, id_zona, operacion, precio, moneda, direccion, ambientes, dormitorios, banos, superficie, estado, destacado, id_agente) VALUES
  (1, 'Casa moderna en zona norte', 'Casa moderna con amplio jardín y cochera.', (SELECT id_tipo FROM tipos_propiedad WHERE nombre='Casa'), (SELECT id_zona FROM zonas WHERE nombre='Yerba Buena'), 'Venta', 125000, 'USD', 'Av. Aconquija 1200', 4, 3, 2, 180, 'Disponible', 1, (SELECT id_usuario FROM usuarios WHERE email='agente@agente.com')),
  (2, 'Departamento céntrico', 'Departamento luminoso cerca de comercios.', (SELECT id_tipo FROM tipos_propiedad WHERE nombre='Departamento'), (SELECT id_zona FROM zonas WHERE nombre='San Miguel de Tucumán'), 'Alquiler', 450000, 'ARS', 'Calle 25 de Mayo 450', 3, 2, 1, 75, 'Disponible', 1, (SELECT id_usuario FROM usuarios WHERE email='agente@agente.com')),
  (3, 'Terreno residencial', 'Terreno ideal para construir una vivienda.', (SELECT id_tipo FROM tipos_propiedad WHERE nombre='Terreno'), (SELECT id_zona FROM zonas WHERE nombre='Tafí Viejo'), 'Venta', 35000, 'USD', 'Barrio Las Yungas', 0, 0, 0, 450, 'Disponible', 0, (SELECT id_usuario FROM usuarios WHERE email='agente@agente.com')),
  (4, 'Casa familiar con pileta', 'Amplia propiedad con pileta y quincho.', (SELECT id_tipo FROM tipos_propiedad WHERE nombre='Casa'), (SELECT id_zona FROM zonas WHERE nombre='Yerba Buena'), 'Venta', 180000, 'USD', 'Los Ceibos 850', 5, 4, 3, 250, 'Disponible', 1, (SELECT id_usuario FROM usuarios WHERE email='agente@agente.com')),
  (5, 'Local comercial céntrico', 'Local comercial en zona de alto tránsito.', (SELECT id_tipo FROM tipos_propiedad WHERE nombre='Local'), (SELECT id_zona FROM zonas WHERE nombre='San Miguel de Tucumán'), 'Alquiler', 600000, 'ARS', 'San Martín 320', 2, 0, 1, 90, 'Disponible', 0, (SELECT id_usuario FROM usuarios WHERE email='agente@agente.com')),
  (6, 'Departamento con balcón', 'Departamento con balcón y excelente iluminación.', (SELECT id_tipo FROM tipos_propiedad WHERE nombre='Departamento'), (SELECT id_zona FROM zonas WHERE nombre='Barrio Norte'), 'Venta', 78000, 'USD', 'Santa Fe 780', 2, 1, 1, 55, 'Disponible', 0, (SELECT id_usuario FROM usuarios WHERE email='agente@agente.com')),
  (7, 'Casa en barrio privado', 'Casa en barrio privado con seguridad.', (SELECT id_tipo FROM tipos_propiedad WHERE nombre='Casa'), (SELECT id_zona FROM zonas WHERE nombre='Yerba Buena'), 'Alquiler', 900000, 'ARS', 'Country Las Pirámides', 5, 3, 2, 200, 'Disponible', 1, (SELECT id_usuario FROM usuarios WHERE email='agente@agente.com')),
  (8, 'Terreno en zona residencial', 'Terreno con servicios disponibles.', (SELECT id_tipo FROM tipos_propiedad WHERE nombre='Terreno'), (SELECT id_zona FROM zonas WHERE nombre='Tafí Viejo'), 'Venta', 28000, 'USD', 'Villa Obrera', 0, 0, 0, 320, 'Disponible', 0, (SELECT id_usuario FROM usuarios WHERE email='agente@agente.com')),
  (9, 'Departamento premium', 'Departamento premium con terminaciones modernas.', (SELECT id_tipo FROM tipos_propiedad WHERE nombre='Departamento'), (SELECT id_zona FROM zonas WHERE nombre='San Miguel de Tucumán'), 'Venta', 145000, 'USD', 'Av. Mate de Luna 900', 4, 3, 2, 110, 'Disponible', 1, (SELECT id_usuario FROM usuarios WHERE email='agente@agente.com')),
  (10, 'Casa económica', 'Casa familiar con patio y cochera.', (SELECT id_tipo FROM tipos_propiedad WHERE nombre='Casa'), (SELECT id_zona FROM zonas WHERE nombre='Banda del Río Salí'), 'Venta', 65000, 'USD', 'Av. Independencia 150', 3, 2, 1, 100, 'Disponible', 0, (SELECT id_usuario FROM usuarios WHERE email='agente@agente.com')),
  (11, 'Departamento monoambiente', 'Monoambiente ideal para estudiantes.', (SELECT id_tipo FROM tipos_propiedad WHERE nombre='Departamento'), (SELECT id_zona FROM zonas WHERE nombre='San Miguel de Tucumán'), 'Alquiler', 280000, 'ARS', 'Córdoba 500', 1, 0, 1, 35, 'Disponible', 0, (SELECT id_usuario FROM usuarios WHERE email='agente@agente.com')),
  (12, 'Casa quinta con pileta', 'Casa quinta con amplio parque y pileta.', (SELECT id_tipo FROM tipos_propiedad WHERE nombre='Casa'), (SELECT id_zona FROM zonas WHERE nombre='El Manantial'), 'Venta', 210000, 'USD', 'Camino del Perú 2000', 6, 4, 3, 350, 'Disponible', 1, (SELECT id_usuario FROM usuarios WHERE email='agente@agente.com')),
  (13, 'Local comercial amplio', 'Local con salón principal y depósito.', (SELECT id_tipo FROM tipos_propiedad WHERE nombre='Local'), (SELECT id_zona FROM zonas WHERE nombre='Tafí Viejo'), 'Venta', 110000, 'USD', 'Av. Alem 600', 3, 0, 1, 130, 'Disponible', 0, (SELECT id_usuario FROM usuarios WHERE email='agente@agente.com')),
  (14, 'Departamento con terraza', 'Departamento moderno con terraza privada.', (SELECT id_tipo FROM tipos_propiedad WHERE nombre='Departamento'), (SELECT id_zona FROM zonas WHERE nombre='Yerba Buena'), 'Alquiler', 550000, 'ARS', 'Av. Perón 1100', 3, 2, 2, 85, 'Disponible', 1, (SELECT id_usuario FROM usuarios WHERE email='agente@agente.com')),
  (15, 'Terreno comercial', 'Terreno apto para desarrollo comercial.', (SELECT id_tipo FROM tipos_propiedad WHERE nombre='Terreno'), (SELECT id_zona FROM zonas WHERE nombre='San Miguel de Tucumán'), 'Venta', 55000, 'USD', 'Av. Roca 1800', 0, 0, 0, 600, 'Disponible', 0, (SELECT id_usuario FROM usuarios WHERE email='agente@agente.com')),
  (16, 'Casa de dos plantas', 'Casa de dos plantas con cochera y patio.', (SELECT id_tipo FROM tipos_propiedad WHERE nombre='Casa'), (SELECT id_zona FROM zonas WHERE nombre='Tafí Viejo'), 'Venta', 135000, 'USD', 'Av. Constitución 750', 5, 3, 2, 190, 'Disponible', 0, (SELECT id_usuario FROM usuarios WHERE email='agente@agente.com')),
  (17, 'Departamento amoblado', 'Departamento totalmente amoblado.', (SELECT id_tipo FROM tipos_propiedad WHERE nombre='Departamento'), (SELECT id_zona FROM zonas WHERE nombre='Barrio Norte'), 'Alquiler', 650000, 'ARS', 'Junín 650', 2, 1, 1, 50, 'Disponible', 0, (SELECT id_usuario FROM usuarios WHERE email='agente@agente.com')),
  (18, 'Casa con amplio jardín', 'Casa familiar rodeada de espacios verdes.', (SELECT id_tipo FROM tipos_propiedad WHERE nombre='Casa'), (SELECT id_zona FROM zonas WHERE nombre='Lules'), 'Venta', 95000, 'USD', 'Belgrano 400', 4, 3, 2, 160, 'Disponible', 0, (SELECT id_usuario FROM usuarios WHERE email='agente@agente.com')),
  (19, 'Local comercial pequeño', 'Local ideal para emprendimientos.', (SELECT id_tipo FROM tipos_propiedad WHERE nombre='Local'), (SELECT id_zona FROM zonas WHERE nombre='San Miguel de Tucumán'), 'Alquiler', 350000, 'ARS', 'Maipú 300', 1, 0, 1, 45, 'Disponible', 0, (SELECT id_usuario FROM usuarios WHERE email='agente@agente.com')),
  (20, 'Casa de categoría', 'Propiedad de categoría con piscina y quincho.', (SELECT id_tipo FROM tipos_propiedad WHERE nombre='Casa'), (SELECT id_zona FROM zonas WHERE nombre='Yerba Buena'), 'Venta', 250000, 'USD', 'Country Jockey Club', 6, 4, 3, 300, 'Disponible', 1, (SELECT id_usuario FROM usuarios WHERE email='agente@agente.com'));

-- Una foto principal por propiedad
INSERT INTO imagenes_propiedad (id_propiedad, url_imagen, es_principal) VALUES
  (1, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', 1),
  (2, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', 1),
  (3, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef', 1),
  (4, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c', 1),
  (5, 'https://images.unsplash.com/photo-1497366754035-f200968a6e72', 1),
  (6, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', 1),
  (7, 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d', 1),
  (8, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef', 1),
  (9, 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0', 1),
  (10, 'https://images.unsplash.com/photo-1568605114967-8130f3a36994', 1),
  (11, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', 1),
  (12, 'https://images.unsplash.com/photo-1600607687644-c7171b42498f', 1),
  (13, 'https://images.unsplash.com/photo-1497366811353-6870744d04b2', 1),
  (14, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c', 1),
  (15, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef', 1),
  (16, 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea', 1),
  (17, 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0', 1),
  (18, 'https://images.unsplash.com/photo-1600585154526-990dced4db0d', 1),
  (19, 'https://images.unsplash.com/photo-1497366754035-f200968a6e72', 1),
  (20, 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d', 1);

-- Control: tiene que dar 3 usuarios, 20 propiedades y 20 imagenes
SELECT (SELECT COUNT(*) FROM usuarios) AS usuarios, (SELECT COUNT(*) FROM propiedades) AS propiedades, (SELECT COUNT(*) FROM imagenes_propiedad) AS imagenes;