# API de Tareas con Usuarios y Seguridad

## Descripción del proyecto

Esta API permite gestionar usuarios y tareas de manera segura.  
Incluye registro y login de usuarios, CRUD de tareas, y protección con JWT y Passport.  
También incorpora limitaciones de peticiones (rate-limit) y control de origen de peticiones (CORS).

---

## Instalación y configuración

1. Clonar el repositorio:

```bash
git clone https://github.com/Sergio-00/ExpressServer.git
cd ExpressServer/
```

2. Instalar dependencias:

```bash
npm i
```

3. Configurar la base de datos con Prisma:

```bash
npx prisma migrate dev --name init
```

4. Variables de entorno necesarias:

```bash
DATABASE_URL=<la_url_db>
JWT_SECRET=<clave_secreta_para_tokens>
SALT_ROUNDS=10
```

5. Correr el servidor:

```bash
npm run dev
```

---

## Seguridad

### Flujo de autenticación

1. Registro: POST /auth/register con email y password.

2. Login: POST /auth/login con email y password. Devuelve un JWT.

3. Rutas protegidas: usar el token en el header Authorization: Bearer <token> para acceder a /tasks.

### Rate-limit

Esta configurado en app.js con express-rate-limit. Y tiene la limitación configurada asi:

- /auth con un máximo 5 intentos por minuto.

- /tasks con un máximo 100 solicitudes por minuto.

### CORS

Configurado en app.js con cors y actualmente permite cualquier origen (origin: "\*") por falta de frontend, pero puede restringirse a un dominio específico.

### Passport

Configurado en src/config/passport.js usando JWT.

- Extrae el token del header y verifica su validez.

- Adjunta req.user para que los controladores sepan qué usuario hace la petición.

- Se aplica a todas las rutas /tasks para asegurar que solo usuarios autenticados puedan acceder.
