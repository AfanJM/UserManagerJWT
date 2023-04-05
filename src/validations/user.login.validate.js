//para generar el JSON SCHEMA
import { Type } from "@sinclair/typebox";
//validar SCHEMA
import Ajv from "ajv";
//VALIDAR FORMATO DEL SHEMA
import addFormats from 'ajv-formats'
//MANEJOR LOS ERRORES DEL SCHEMA
import addErrors from 'ajv-errors'
//IMPORT LOS SHEMAS NECESARIOS
import { emailValidateSchema,passwordValidateSchema } from "../lib/validateType.js";

const LoginSchemaValidate = Type.Object({
    email:emailValidateSchema,
   password:passwordValidateSchema
},{
    additionalProperties:false,
    errorMessage:{
        additionalProperties:'El formato de este objeto no es el correcto'
    }
})

//APLICAMOS EL SCHEMA
const ajv = new Ajv({allErrors:true});
addFormats(ajv,['email']).addKeyword("kind").addFormat("modifier");

ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
addErrors(ajv);

//METEMOS EL SHEMA EN UN AJV
const validateSchema = ajv.compile(LoginSchemaValidate);

//exportamos
export const userLoginValidate = (req,res,next)=> {
    const isDTOValid = validateSchema(req.body);

    //LANZAMOS LOS ERRORES
    if(!isDTOValid) return res
    .status(400)
    .send({errors: validateSchema.errors.map(error => error.message)  })

    next();

}


