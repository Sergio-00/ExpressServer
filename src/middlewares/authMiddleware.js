import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  // Pedimos los headers de authorization del usuario logueado.
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  // Verificamos que el header siga el formato correcto.
  const [type, token] = authHeader.split(" ");
  if (type !== "Bearer" || !token) {
    return res.status(401).json({ error: "Invalid authorization format" });
  }

  try {
    // Intentamos verificar el token del header descodificandolo con el secreto en el .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardamos el token descodificado en user.id
    req.user = { id: decoded.sub };

    // Procedemos a la siguiente parte en las rutas de tasks
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
