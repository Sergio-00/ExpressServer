import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import prisma from "../prismaClient.js";

// Creamos un objeto options que extrae el token del header de la petición y el secreto de JWT.
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

//* Creamos una estrategia de JWT para poder usarla en rutas
passport.use(
  // Usamos el objeto options para verificar el token y luego es pasado a jwtPayload.
  // Luego podremos mandarlo con done.
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      // Encontramos el usuario con el id del token descodificado en prisma.
      const user = await prisma.user.findUnique({
        where: { id: jwtPayload.sub },
      });

      // Si no hay usuario entonces se rechaza el login.
      if (!user) {
        return done(null, false);
      }

      // Si hay usuario y no hay error entonces creamos el req.user
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
