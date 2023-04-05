import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.routes.js';
import {PORT,MONGODB_URL} from './config.js';



//convirtiendo los datos en JSON 
const app = express();
app.use(express.json());

//
app.use('/user',userRouter)

//404
app.use((req,res,next)=>{
    res.status(404).send("Oops, page not found")
  
});


//arrancamos el servidor
const arranque = async() =>{
    //nos conectamos a la BD
    console.log("Conectado a la BD")
    await mongoose.connect(MONGODB_URL);
    app.listen(PORT ,()=>{
        console.log("Servidor escuchando en el puerto", PORT)
        
 
    });
}
arranque();