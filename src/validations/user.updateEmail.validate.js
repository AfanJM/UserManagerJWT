import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addFormats from 'ajv-formats'
import addErorrs from 'ajv-errors'

import { emailValidateSchema, passwordValidateSchema } from "../lib/validateType.js";


const UpdateEmailValidate = Type.Object({
    email:emailValidateSchema,
    password:passwordValidateSchema
},{
    additionalProperties:false,
    errorMessage:{
        additionalProperties:'El formato de este objeto no es el correcto'
    }
});

//
const ajv = new Ajv({allErrors:true});
addFormats(ajv,['email']).addKeyword("kind").addFormat("modifier");
addErorrs(ajv);

ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);



//
const validateSchema = ajv.compile(UpdateEmailValidate);

//EXPORTAMOS
export const userUpdateEmailValidate = (req,res,next) =>{
    const isDTOValid = validateSchema(req.body);

    if(!isDTOValid) return res
    .status(400)
    .send()
    next()
}
