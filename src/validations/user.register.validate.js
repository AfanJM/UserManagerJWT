//generado de JSON SCHEMA
import {Type} from '@sinclair/typebox';
//validador de JSON SCHEMA
import Ajv from 'ajv';
//validar formato
import addFormats from 'ajv-formats';
//validador para los errores
import addErrors from 'ajv-errors';

import { apellidoValidateSchema, emailValidateSchema, 
 idValidateSchema, nombreValidateSchema, passwordValidateSchema } from '../lib/validateType.js';

//esquema con sinclair/type
const RegisterSchemaValidate =  Type.Object({
   _id:idValidateSchema,
   nombre:nombreValidateSchema,
   apellido:apellidoValidateSchema,
   email:emailValidateSchema,
   password:passwordValidateSchema

},{
    //no quiero propiedades extras
    additionalProperties: false,
    errorMessage:{
        additionalProperties:'El formato de este objeto no es el correcto'
    }
});

//Aplicamos el SChema
const ajv = new Ajv({allErrors:true});
addFormats(ajv,['email','uuid']).addKeyword("kind").addFormat("modifier");

/*validamos con ajv que la password tenga al menos
una mayuscula, minuscula y un numero*/
ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);

addErrors(ajv);

//metemos el esquema en el Ajv para que nos valide en una funcion
const ValidateSchema = ajv.compile(RegisterSchemaValidate);

export const userRegisterValidate = (req,res,next)=>{
    const isDTOValid = ValidateSchema(req.body)

    //lanzamos los errores
    if(!isDTOValid) return res
    .status(400)
    .send({errors: ValidateSchema.errors.map(error => error.message)  })
    //.send(ajv.errorsText(ValidateSchema.errors, {separator:"\n" }))
    
    next();
    

}
