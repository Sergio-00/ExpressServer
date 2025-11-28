import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

import tasks from "./routes/tasks.js";
import auth from "./routes/auth.js";

// Configuramos express para usarlo en una constante app.
const app = express();

// Creamos el puerto en una constante.
const PORT = 3000;

// Permitimos que express reciba texto json y lo interprete como un objeto en JavaScript.
app.use(express.json());

// Se permiten todos los sitios por una falta de front-end para el CORS.
app.use(
  cors({
    origin: "*",
  })
);

// Limitador para la verificación de autenticación. 5 intentos cada un minuto.
const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many requests, try again later",
});

// Limitador para la verificación de tareas. 100 intentos cada un minuto.
const tasksLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: "Too many requests, try again later",
});

// Implementamos los limitadores a las rutas de autenticación y tareas.
app.use("/auth", authLimiter, auth);
app.use("/tasks", tasksLimiter, tasks);

// Creamos un mensaje que nos avise que el API funciona en la raiz del servidor.
app.get("/", (req, res) => {
  res.send("API running");
});

// Iniciamos el servidor de express en el localhost con el puerto 3000.
app.listen(PORT, () => {
  console.log(`Server listening in: http://localhost:${PORT}/`);
});
