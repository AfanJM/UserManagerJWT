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

Requerimientos funcionales:

- El usuario podrá registrarse en la aplicación introduciendo los datos requeridos.

- El correo electrónico debe ser único para cada usuario.

- El usuario podrá autenticarse en la aplicación utilizando su email y contraseña.

- Si la autenticación es válida, la aplicación devolverá al usuario un identificador que le servirá para acreditar su identidad ante la aplicación cuando quiera modificar/borrar sus datos.

- El usuario podrá obtener todos sus datos, excepto su contraseña, utilizando su identificador.

- El usuario podrá actualizar su nombre y apellidos, el identificador será necesario.

- El usuario podrá actualizar su correo electrónico, será necesario el identificador y la contraseña actual.

- El usuario podrá actualizar su contraseña, será necesario el identificador y la contraseña actual.

- El usuario podrá borrar todos sus datos de la plataforma, será necesario el identificador y la contraseña actual.


- solution: to register a user you need his data, for this the endpoint is as follows: http://localhost:8010/user/register, in the body we introduce the data

- POST:

- example: { "_id":"caa14bd7-5bd3-4903-a3b0-530826f60a04", "name": "juan sebastian", "lastname": "afanador mora", "email": "juan@gmail.com", "password": "GEge3342gge" (this password is encrypted)

} this way a user is registered

now comes the login part

- GET: http://localhost:8010/user/login, the data would also come in the body, for this you only need the emai and password, when this happens the user will have his token, this token is necessary to: view your profile, change the password and delete
view profile: http://localhost:8010/user/profile, for this you only need the token, enter the token in auth->Bearer and you will automatically get the information of that user.

- update data(first name and last name), for this you need the identifier, first name and last name to be changed

- PATCH http://localhost:8010/user/update-data

- example: { "first name": "new name", "last name": "new last name" } it is necessary to enter the login as in the profile view step.

- update email, you will need the current ID, email and password.

- PATCH http://localhost:8010/user/update-email

- example: { "email": "nuevoemail@gmail.com", "password:"GEge3342gge" } it is necessary to enter the token as in the step of viewing profile

- update password, you will need the identifier, the new password and the old password.

- PATCH http://localhost:8010/user/update-password

- example: { "newPassword": "NewPassword83748", { "oldPassword: "GEge3342gge". obviously these passwords will be encrypted. it is necessary to enter the token as in the profile view step.

}

- delete user, you need the token
- DELETE http://localhost:8010/user/delete if you want to delete a user you only have to enter the identifier and that's it, you are deleting the user.
