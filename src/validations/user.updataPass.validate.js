import {Type} from '@sinclair/typebox'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import addErrors from 'ajv-errors'

import { passwordValidateSchema } from '../lib/validateType.js'

//la contraseña necesita una vieja y una nueva para cambiarla
const updatePasswordvalidate = Type.Object({
    oldPassword: passwordValidateSchema,
    newPassword: passwordValidateSchema,
},{
    additionalProperties:false,
    errorMessage:{
        additionalProperties:'El formato de este objeto no es el correcto'
    }
});

//
const ajv = new Ajv({allErrors:true});
ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
.addKeyword("kind").addFormat("modifier");
addErrors(ajv);


//
const validateSchema = ajv.compile(updatePasswordvalidate);

export const userUpdatePassValidate = ((req,res,next) =>{
    const isDTOValid = validateSchema(req.body);

    if(!isDTOValid) return res
    .status(400)
    .send();






    next();

})