
//importamos la firma para el token y la verificacion
import { jwtVerify } from "jose";
import { JWT_PRIVATE_KEY } from "../config.js";

export const userJWT = async(req,res,next) =>{
    //cabezera token
    const {authorization} = req.headers;

    if(!authorization) return res
    .status(401)
    .send('Usuario no autorizado')

    const jwt = authorization.split(' ')[1];

    if (!jwt)
    return res.status(401).send({ errors: ['Usuario no autorizado'] });



    try {
        //pasando a string
        const encoder = new TextEncoder();
        //
        const {payload} = await jwtVerify(jwt, encoder.encode(JWT_PRIVATE_KEY));
        
        req.id = payload.id
        next();

    } catch (error) {
        return res.status(401).send('Usuario no autorizado')
    }
    



}