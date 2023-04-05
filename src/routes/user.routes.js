import { Router } from "express";
//IMPORT LOS CONTROLLADORES
import {  userPostRegisterController,userPostLoginController,
          userPatchDataController,userPatchEmailController,
          userPatchPasswordController,userGetController,
          userDeleteController} from "../controller/user.controller.js";


//IMPORTAMOS LAS VALIDACIONES

import {userLoginValidate}            from "../validations/user.login.validate.js";
import {userRegisterValidate}         from '../validations/user.register.validate.js';
import {userUpdateDataValidate}       from "../validations/user.updateData.validate.js";
import {userUpdateEmailValidate}      from "../validations/user.updateEmail.validate.js";
import {userUpdatePassValidate}       from "../validations/user.updataPass.validate.js";
import {userDeleteValidate}           from '../validations/user.delete.validate.js';
import {userJWT}                      from "../validations/user.jwt.js";


const router = Router();

//EndPoint
//AGREGAR RUTAS Y MIDDLEWARE QUE SEAN NECESARIOS

 //POST------------------------------------
 
 //registrarse en la app con los 4 campos
 router.post('/register',userRegisterValidate,userPostRegisterController) 

 //logueo con email y pass------------------------------------
 router.post('/login',userLoginValidate,userPostLoginController )


//GET------------------------------------

//obtener los datos del perfil(menos la contraseña)
router.get('/profile', userJWT,userGetController) 

//PATCH------------------------------------
//actualiza nombre y apellido
router.patch('/update-data', userJWT,userUpdateDataValidate, userPatchDataController)

//actualiza email ------------------------------------
router.patch('/update-email', userJWT, userUpdateEmailValidate,userPatchEmailController) 

//actualiza contraseña------------------------------------
router.patch('/update-password', userJWT, userUpdatePassValidate,userPatchPasswordController) 

//DELETE------------------------------------
//router.delete('/delete/:id') //borrar usuario
router.delete('/delete', userJWT, userDeleteValidate, userDeleteController )

//EXPORTAMOS ------------------------------------
export default router;