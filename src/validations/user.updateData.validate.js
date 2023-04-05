import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addFormats from 'ajv-formats'
import addErorrs from 'ajv-errors'
import { nombreValidateSchema,apellidoValidateSchema } from "../lib/validateType.js";

const UpdateDataValidate = Type.Object({
    nombre: nombreValidateSchema,
    apellido:apellidoValidateSchema
},{
    additionalProperties:false,
    errorMessage:{
        additionalProperties:'El formato de este objeto no es el correcto'
    }
});

//APLICAMOS EL SCHEMA
const ajv = new Ajv({allErrors:true});
addErorrs(ajv);

//METEMOS EL SCHEMA EN AJV
const validateSchema = ajv.compile(UpdateDataValidate);

//EXPORTAMOS
export const userUpdateDataValidate = (req,res,next) =>{
    const isDTOValid = validateSchema(req.body);
    
    if(!isDTOValid) return res
    .status(400)
    .send({errors: validateSchema.errors.map(error => error.message)  })
    
    
    next();
    
}

