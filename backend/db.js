import "dotenv/config";
import mysql from "mysql2/promise";

// Un "pool" es un grupo de conexiones a MySQL que se reutilizan,
// en vez de abrir una nueva en cada pedido.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  decimalNumbers: true, // que precio llegue como número y no como texto
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;