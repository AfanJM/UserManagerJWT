USER MANAGEMENT

- ABSTRACT: user management application for a web app. The communication with the application is through a REST API (HTTP).

ENTITIES

-User: User registered on the platform, all fields are mandatory.

First name:
Last name:
Email:
Password:
FUNCTIONAL REQUIREMENTS:

- The user will be able to register in the application by entering the required data.

- The email must be unique for each user.

- The user will be able to authenticate to the application using his email and password.

- If the authentication is valid, the application will return to the user an identifier that will be used to prove his identity to the application when he wants to change/delete his data.

- The user will be able to obtain all his data except his password, using his identifier.

- The user will be able to update his name and surname, the identifier will be necessary.

- The user will be able to update his email, it will be necessary the identifier and the current password.

- The user will be able to update his password, it will be necessary the identifier and the current password.

- The user will be able to delete all his data from the platform, it will be necessary the identifier and the current password.

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
