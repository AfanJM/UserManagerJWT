import UserModel from "../Schema/User.Schema.js";
import {hash} from "bcrypt";
import {SALT} from '../constants/salt.js'
import { compare } from "bcrypt";
import {SignJWT,jwtVerify} from 'jose'
import { JWT_PRIVATE_KEY } from "../config.js";






//POST------------------------------------
//REGISTRO CON TODOS OS CAMPOS REQUERIDOS
export const userPostRegisterController = async(req,res)=>{

    const {_id,nombre,
    apellido,email,password} = req.body;

    //buscamos un usuario con la misma _id
    const userId = await UserModel.findById(_id)

    //si existe
    if(userId) return res.status(409).send('Ya existe un usuario con este id registrado');

    //buscamos un usuario con el mismo email
    const userEmail = await UserModel.findOne({email})

    //si existe
    if(userEmail) return res.status(409).send('Ya existe un usuario con este email registrado');

    //sino encontramos ningun usuario con emai y id pues lo registramos
    //encript de la password
        const hashedPassword = await hash(password,SALT);
    


    const user = new UserModel({
    _id,
    nombre,
    apellido,
    email,
    password:hashedPassword,
  
    });

    //guardamos el user
    await user.save();
    return res.send({message: ['Usuario registrado con exito']});

    //return res.send('Usuario registrado correctamente');

    




}

//LOGUEO DEL USUARIO CON EMAI Y PASSWORD------------------------------------------------
export const userPostLoginController = async(req,res)=>{
    const {email,password} = req.body;

    //buscamos un usuario con un email
    const userEmail = await UserModel.findOne({email});

    //sino existe el email
    if(!userEmail) return res
    .status(401)
    .send('credenciales incorrectas');

    //comparamos la password
    const checkPassword = await compare(password, userEmail.password)

    //sino coincide la password
    if(!checkPassword) return res
    .status(401)
    .send('Credenciales incorrectas');

    //si coincide todo generamos el JWT para que el usuario obtenga sus datos
    const jwtConstructor = new SignJWT({
        id:userEmail._id
    })
    //datos del jwt
    /*aqui le decimos al JWT e algoritmo y e tipo de jwt
    que seria el header, despues le decimos el momento exacto
    en donde inicia y el tiempo en donde este termina y por ultimo
    a firma
    */
    const encoder = new TextEncoder();
    const jwt =  await jwtConstructor.setProtectedHeader({alg:'HS256', 
    typ:'JWT',
    }).setIssuedAt().setExpirationTime('1h').sign(encoder.encode(JWT_PRIVATE_KEY));

    return res.status(200).send({jwt});

   
}


//GET------------------------------------
//ver los datos del usuario menos la password
export const userGetController = async(req,res) =>{
    const {id} = req;
    //buscamos por id 
    const userId = await UserModel.findById(id).exec();

    if(!userId) return res.status(401).send({ errors: ['Usuario no autorizado'] });

    //devolvemos la info del usuario (menos la password)
    const {_id,nombre,apellido,email} = userId;

    return res.send({_id,nombre,apellido,email});
    
}



//PATCH------------------------------------
//actualiza la data(nombre y apellido) del usuario
export const userPatchDataController = async(req,res) =>{
    const {id} = req;
    const {nombre,apellido} = req.body;

    const userId = await UserModel.findById(id).exec();
    if(!userId) return res.status(401).send({ errors: ['Usuario no autorizado']})

    //actualizamos los datos
    userId.nombre = nombre;
    userId.apellido = apellido;
    //guardamos el usuario
    await userId.save();
    return res.send({message: ['Usuario actualizado con exito']});




}


//actualiza el email del usuario------------------------------------
export const userPatchEmailController = async(req,res)  =>{
    const {email,password} = req.body;
    const {id} = req;

    const userById = await UserModel.findById(id);

    if(!userById) return res.status(401).send({ errors: ['Usuario no autorizado']})

    //comparamos la password   
    const checkPassword = await compare(password, userById.password);


    if(!checkPassword) return res.send({errors: ['Credenciales incorrectas']});

    //actualizamos el email
    userById.email = email;
    //guardamos el usuario
    await userById.save();
    return res.send({message: ['Email de usuario actualizado con exito']});

}

//actualiza la password (necesario la oldPassword y newPassowrd)------------------------------------
export const userPatchPasswordController = async(req,res) =>{
    const {id} = req;
    const {oldPassword,newPassword} = req.body;
    //buscamos id
    const userById = await UserModel.findById(id).exec();
    if(!userById) return res.status(401).send({ errors: ['Usuario no autorizado']})

    //comparamos la password
    
    const checkPassword = await compare(oldPassword, userById.password);
    if(!checkPassword) return res.send({errors: ['Credenciales incorrectas']});
    
    //actualizamos la password

    const hashedPassword = await hash(newPassword,SALT);
    userById.password = hashedPassword;
    //guardamos el usuario

    await userById.save();
    return res.send({message: ['Password actualizado con exito']});

}


//DELETE------------------------------------
export const userDeleteController = async(req,res)=>{
    const {id} = req;
    const {password} = req.body
    //buscamos id
    const userById = await UserModel.findById(id).exec();
    if(!userById) return res.status(401).send({ errors: ['Usuario no autorizado']})

    //comparamos la password
    const checkPassword = await compare(password, userById.password)
    if(!checkPassword) return res.send({errors: ['Credenciales incorrectas']});





    //borramos el usuario
    await userById.deleteOne();
    
    return res.send({message: ['Usuario eliminado con exito']});

}