# pratech

De antemano quisiera agradecerles a todos por la oportunidad de presentarles mi trabajo y por su tiempo para considerarlo.

# Backend

El backend se construyó usando NodeJS, Express y Mongoose. Estas librerias permiten crear un servicio backend que se conecta con el servidor local de mongoDB que normalmente esta configurado asi: mongodb://localhost/27017 y manipula dos colecciones. Las colecciones comprenden una para administradores y otra para usuarios. Es necesario tener un ambiente donde exista un servidor de mongoDB, esa creacion o instrucciones no son el objetivo de este proyecto.

La figura de administradores son las personas que pueden loggearse a la aplicacion y por consiguiente manipular la colección de usuarios. El servicio backend permite hacer el registro de nuevos administradores y el loggeo de los mismos. Para estos dos primeros requests se usa el método post. El primero, permite crear un nuevo documento en la colección administradores con los campos nombre, password e email de administrador. Los campos nombre e email son unicos en la colección, por lo tanto no puede haber 2 administradores con los mismos datos. El proceso de log in se maneja por medio de método post el cual devuelve el token necesario para seguir haciendo requests al backend. El tema de autorización en los headers y envio de información en el body de los requests los maneja el frontend de manera automática, tanto para los requests mencionados como para los demás que serán mencionados mas adelante.


Una vez se obtiene el token, es posible hacer los siguientes requests al backend: Listar Usuarios (GET) con parámetro opcional de _id de usuario, Agregar usuario (post) con parámetros requeridos: nombre,genero,situación de empleo, fecha de nacimiento, país de residencia, eliminar usuario (delete) con parámetro obligatorio _id de usuario y finalmente actualizar usuario (put) con parámetros requeridos: _id,nombre,genero,situación,fecha de nacimiento y pais de residencia. Sin el token, no se puede usar los requests mencionados. 

Para correr este servicio es necesario ejecutar desde el directorio backend el comando npm install y luego el comando npm start.

# Frontend

Para construir esta aplicación se uso ReactJS, Forms de la librearia RJSF y Bootstrap. 
La aplicación comienza renderizando la página de log in, que puede llevar a Registrar o al Dashboard. Para registrar un nuevo administrador es necesario dar clic en el botón link Register, una vez el usuario es registrado, se redirige a la pagina de login para loggear el nuevo administrador.

Una vez en el dashboard el administrador puede navegar entre las páginas de Listing y Add users. La primera muestra una tabla la cual renderiza de manera dinamica los documentos en la coleccion de usuarios. La segunda permite agregar nuevos usuarios usando el form creado a partir de RJSF. Cuando se renderiza la tabla, se implementan dos botones DELETE y UPDATE. Estos permiten eliminar y actualizar los documentos en la coleccion de manera dinamica e individual

Para poner a correr el servicio es necesario ejecutar los comandos npm install y luego npm start desde el directorio frontend.

Quedo atento a sus comentarios y feedback.
Saludos,
Samuel 
