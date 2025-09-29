//Importa Mongoose, una biblioteca ODM para MongoDB en Node.js
import mongoose from "mongoose";

//Define el esquema (estructura) para los documentos de usuario en la base de datos
const userSchema = new mongoose.Schema({
    //Campo "name": debe ser una cadena de texto y es obligatorio
    name: { type: String, required: true },

    //Campo "password": debe ser una cadena de texto y es obligatorio. Aquí se suele guardar el hash de la contraseña, no la contraseña en texto plano
    password: { type: String, required: true },

    //Campo "email": debe ser una cadena de texto y es obligatorio. En una app real, podrías también agregar validaciones de formato o unicidad
    email: { type: String, required: true }
},
{
    //Opciones del esquema
    //"timestamps: true" agrega automáticamente los campos "createdAt" y "updatedAt"
    timestamps: true
});
//Crea el modelo "User" a partir del esquema definido
//Este modelo representa la colección "users" en MongoDB
export default mongoose.model("User", userSchema);