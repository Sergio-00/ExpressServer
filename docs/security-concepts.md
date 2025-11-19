# Security concepts explanation

## rate-limit (qué es y para qué sirve)

El rate-limit se refiere a limitar la cantidad de peticiones al servidor del sitio web a un tiempo especificado para evitar muchas peticiones seguidas.

Un ejemplo de uso de esto seria para evitar que una persona intente sobrecargar mi servidor mediante bots con un monton de peticiones.

## CORS (qué problema resuelve)

Cross-Origin Resource Sharing es un protocolo que protege a los usuarios de sitios web que quieren robar datos de tus sesiones en varios sitios web sin permiso. Esto soluciona que cualquier sitio pueda pedir información privada sin permiso.

Un ejemplo donde usar esto seria en mi sitio poner esta verificación para impedir que cualquier sitio externo pueda acceder a datos privados a menos que yo lo permita.

## JWT (qué es un token, qué lleva dentro, para qué se usa)

Un token es un identificador que permite verificar de manera segura y rapida quien eres sin estar iniciando sesión cada vez.

Un JWT contiene un Header con el tipo de token, un Payload que contiene los datos del usuario y por ultimo un Signature que tiene la firma en el JWT_SECRET.

Esto sirve para autenticación, permitir acceso a varias rutas, no tener que estar enviando el usuario y la contraseña y mantener la sesión.

Un ejemplo seria cuando necesitas comprobar si tienes acceso a una información especifica de la página entonces puedes verificar rapidamente con este token.
