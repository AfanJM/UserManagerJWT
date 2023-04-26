# Gestor de usuarios
aplicación de gestión de usuarios para una aplicación web. La comunicación con la aplicación se realiza a través de una API REST (HTTP).

## Instalacion

1. Clonar el repositorio:
git clone https://github.com/AfanJM/UserManagerJWT.git

2. Instalar las dependencias:
npm install

3. Inicar el servidor:
npm run dev


## Entidades

- `usuario`: usuario registrado en la plataforma, todos los campos son obligatorios. Los campos son:
nombre,apellido,email,contraseña

## Requerimientos funcionales:

- El usuario podrá registrarse en la aplicación introduciendo los datos requeridos.

- El correo electrónico debe ser único para cada usuario.

- El usuario podrá autenticarse en la aplicación utilizando su email y contraseña.

- Si la autenticación es válida, la aplicación devolverá al usuario un identificador que le servirá para acreditar su identidad ante la aplicación cuando quiera modificar/borrar sus datos.

- El usuario podrá obtener todos sus datos, excepto su contraseña, utilizando su identificador.

- El usuario podrá actualizar su nombre y apellidos, el identificador será necesario.

- El usuario podrá actualizar su correo electrónico, será necesario el identificador y la contraseña actual.

- El usuario podrá actualizar su contraseña, será necesario el identificador y la contraseña actual.

- El usuario podrá borrar todos sus datos de la plataforma, será necesario el identificador y la contraseña actual.

- solución: para dar de alta un usuario se necesitan sus datos, para ello la ruta (endpoint) es la siguiente: http://localhost:8010/user/register, en el cuerpo introducimos los datos

## POST: http://localhost:8010/user/register

- ejemplo: { "_id": "caa14bd7-5bd3-4903-a3b0-530826f60a04", 
- "name": "juan sebastian", 
- "lastname": "afanador mora", 
- "email": "juan@gmail.com", 
- "password": "GEge3342gge" (esta contraseña está encriptada)

} 
- de esta manera se registra un usuario

- ahora viene la parte de login

## GET: http://localhost:8010/user/login
- los datos también vendrían en el cuerpo, para esto solo se necesita el email y la contraseña, cuando esto suceda el usuario tendrá su token, este token es necesario para: ver su perfil, cambiar la contraseña y eliminar
- ver perfil: http://localhost:8010/user/profile para esto solo necesitas el token, ingresa el token en auth->Bearer y automáticamente obtendrás la información de ese usuario.

## PATCH http://localhost:8010/user/update-data
- para actualizar los datos(nombre y apellidos), para esto necesitas el identificador, nombre y apellidos a cambiar

-  ejemplo: { "nombre": "nuevo nombre", 
-  "apellido": "nuevo apellido" 
}
para esto es necesario introducir el identificador como en el paso de vista de perfil.

## PATCH http://localhost:8010/user/update-email
- para actualizar el correo electrónico, necesitará el ID actual, correo electrónico y contraseña.

- ejemplo: { "email": "nuevoemail@gmail.com",
-  "password: "GEge3342gge" 
} 
para esto es necesario introducir el token como en el paso de ver perfil

## PATCH http://localhost:8010/user/update-password
- para actualizar contraseña, necesitará el identificador, la nueva contraseña y la antigua contraseña.
- ejemplo: { "nuevaContraseña": "NewPassword83748", 
-  "oldPassword: "GEge3342gge"
}
obviamente estas contraseñas estarán encriptadas. es necesario introducir el token como en el paso de ver perfil.


## DELETE http://localhost:8010/user/delete 
- para borrar usuario, necesitas el token
- si quieres borrar un usuario solo tienes que introducir el identificador y listo, se eliminara el usuario.
