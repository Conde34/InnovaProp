import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import propiedadesRouter from "./routes/propiedades.routes.js";
import consultasRouter from "./routes/consultas.routes.js";
import notFound from "./middlewares/not-found.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", async (_req, res, next) => {
  try {
    await pool.query("SELECT 1");
    return res.json({ ok: true, mensaje: "Backend y base de datos funcionando" });
  } catch (error) {
    return next(error);
  }
});

app.use("/api/propiedades", propiedadesRouter);
app.use("/api/consultas", consultasRouter);
app.use(notFound);
app.use(errorHandler);

export default app;
