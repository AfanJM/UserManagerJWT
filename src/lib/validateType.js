import { Type } from "@sinclair/typebox";

export const idValidateSchema = Type.String({
        format:'uuid',
        errorMessage:{
            type:'El tipo identificacion no es valido, debe ser un string',
            format:'El formato de la uuid no es valido'
        }
    });

export const nombreValidateSchema = Type.String ({
    minLength: 4,
    maxLength: 20,
    errorMessage:{
        minLength:'El nombre debe tener al menos 4 caracteres de longuitud',
        maxLength:'El nombre debe tener como maximo 20 caracteres de longuitd'
        
    }
});

export const apellidoValidateSchema = Type.String ({
    minLength:4,
    maxLength:50,

    errorMessage:{
        minLength:'El apellido debe tener al menos 4 caracteres de longuitud',
        maxLength:'El apellido debe tener como maximo 50 caracteres de longuitd'
        
    }
});

export const emailValidateSchema =   Type.String ({
    format:'email',
    errorMessage:{
        type:'El tipo de email deber ser un string',
        format:'El debe email debe contener un correo electronico valido'
    }
});


export const passwordValidateSchema = Type.String ({
    minLength:10,
    maxLength:25,
    format:'password',
    errorMessage:{
        type:'El tipo de password debe ser un String',
        format:'El formato de la password no es valido ',
        minLength:'La password debe tener al menos 10 caracteres de longuitud',
        maxLength:'La password debe tener como maximo 25 caracteres de longuitd'
    }

});


