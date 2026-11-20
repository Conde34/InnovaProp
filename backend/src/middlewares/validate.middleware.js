export function validate(schema) {
  return (req, res, next) => {
    const resultado = schema.safeParse(req.body);
    if (!resultado.success) {
      const errors = resultado.error.issues.map((issue) => ({
        field: issue.path.join(".") || "body",
        message: issue.message,
      }));
      return res.status(400).json({ message: "Datos inválidos", errors });
    }

    req.validatedBody = resultado.data;
    return next();
  };
}
