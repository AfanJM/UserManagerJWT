import mongoose from "mongoose";
const {Schema,model} = mongoose




//creamos el esquema para los usuarios
const UserSchema = new Schema({
    
    _id:{type:String, _id:false}, //no me genera un id 
    nombre:{type:String, require:true, minLength:4, maxLength:20},
    apellido:{type:String, require:true, minLength:4, maxLength:50},
    email:{type:String, require:true, unique:true},
    password:{type:String, require:true}

})

//modelo para los usuarios
const UserModel = model('User', UserSchema);

//solo usamos el modelo asi que lo exportamos
export default UserModel;