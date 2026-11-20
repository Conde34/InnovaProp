import "dotenv/config";

const PORT = process.env.PORT || 3000;

if (!process.env.JWT_SECRET) {
  throw new Error("Falta configurar JWT_SECRET en backend/.env");
}

const { default: app } = await import("./app.js");

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
