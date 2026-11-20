# InnovaProp

Sitio web de una inmobiliaria con catálogo de propiedades, formulario de contacto, login con roles y paneles de administración. Proyecto del TFI de **Gestión de Desarrollo de Software** (UTN FRT).

**Equipo:** Luciano, Santi ([@Conde34](https://github.com/Conde34)) y Toto (Tobias Medrano).

## Tecnologías

| Capa | Tecnologías |
| --- | --- |
| Frontend | React 19, Vite, react-bootstrap, react-router-dom, Zustand |
| Backend | Node.js, Express 5 (ESM), mysql2 |
| Base de datos | MySQL (base `innovaprop`) |
| Seguridad | bcryptjs, JSON Web Tokens, helmet, express-rate-limit, Zod |

## Requisitos

- Node.js (versión LTS reciente) y npm
- MySQL 8 (o XAMPP) y un cliente como MySQL Workbench

## Puesta en marcha

### 1. Clonar el repositorio

```
git clone https://github.com/Conde34/InnovaProp.git
cd InnovaProp
```

### 2. Base de datos

En MySQL, ejecutá en este orden los scripts de `backend/database/`:

1. `crear_tablas.sql`
2. `cargar_datos.sql`

Si tu script no crea la base, creala antes con `CREATE DATABASE innovaprop;`.

La base tiene 7 tablas: `usuarios`, `tipos_propiedad`, `zonas`, `propiedades`, `imagenes_propiedad`, `consultas` y `favoritos`.

### 3. Backend (puerto 3000)

```
cd backend
npm install
copy .env.example .env
npm run dev
```

Abrí `backend/.env` y completá los valores. **`JWT_SECRET` es obligatorio**: si falta, el backend no arranca. Nunca subas el `.env` al repositorio (está ignorado por `.gitignore`).

<!-- REVISAR: completar acá el nombre de las variables de conexión a MySQL según backend/.env.example y backend/src/config -->

Para comprobar que anda: `http://localhost:3000/api/health`.

### 4. Frontend (puerto 5173)

En **otra terminal**, desde la raíz del proyecto:

```
npm install
npm run dev
```

Abrí `http://localhost:5173`.

## Usuarios y roles

Hay tres roles: `cliente`, `agente` y `admin`. El registro desde la web siempre crea usuarios con rol `cliente`.

Para tener un administrador, registrá un usuario desde la web y subile el rol en MySQL:

```sql
UPDATE innovaprop.usuarios SET rol = 'admin' WHERE email = 'tu@email.com';
```

Después cerrá sesión y volvé a entrar (el rol viaja dentro del token).

| Rol | Puede |
| --- | --- |
| Público | Ver propiedades y enviar consultas por Contacto |
| Cliente | Lo anterior, con sesión iniciada |
| Agente | Crear propiedades y modificar o eliminar solo las suyas |
| Admin | Todo lo anterior sobre cualquier propiedad, más gestión de usuarios y consultas |

Los permisos se validan **en el backend** (`authenticateToken` + `requireRole` + chequeo de dueño). Las rutas protegidas del frontend son solo una ayuda de interfaz.

## API principal

| Método | Ruta | Acceso |
| --- | --- | --- |
| GET | `/api/health` | Público |
| POST | `/api/auth/register` | Público |
| POST | `/api/auth/login` | Público |
| GET | `/api/auth/me` | Con sesión |
| GET | `/api/propiedades` | Público (filtros: `tipo`, `operacion`, `ubicacion`, `moneda`, `precioMin`, `precioMax`) |
| GET | `/api/propiedades/:id` | Público |
| POST | `/api/propiedades` | Admin y agente |
| PUT / DELETE | `/api/propiedades/:id` | Admin, o agente dueño de la propiedad |
| POST | `/api/consultas` | Público |
| GET / PUT / DELETE | `/api/usuarios` | Solo admin (eliminar es baja lógica: `activo = 0`) |

## Estructura

```
InnovaProp/
├── src/                 Frontend (pages, components, services, store, router)
├── public/
└── backend/
    ├── database/        crear_tablas.sql y cargar_datos.sql
    └── src/             routes, controllers, services, models,
                         middlewares, schemas, config
```

## Flujo de trabajo con Git

1. Crear una rama por funcionalidad.
2. Abrir un Pull Request **hacia `dev`** (revisar siempre que la base sea `dev`).
3. Cuando `dev` está estable, Pull Request de `dev` a `main`.

## Estado del proyecto

**Funcionando y probado:** catálogo de propiedades desde MySQL, formulario de Contacto, registro y login con JWT, y CRUD de propiedades desde el panel admin.

**Implementado, en prueba:** gestión de usuarios (admin), favoritos y administración de consultas.

**Pendiente:**

- Decidir si el detalle de una propiedad exige sesión
- Imágenes con Cloudinary
- Latitud y longitud para mostrar mapa
- Protección de las ramas `main` y `dev` en GitHub
- Revisar vulnerabilidades moderadas reportadas por `npm audit` en el backend
