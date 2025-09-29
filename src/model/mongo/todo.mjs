//Importa Mongoose, la biblioteca que usamos para modelar datos en MongoDB
import mongoose from "mongoose";

//Define el esquema para los documentos de la colección "todos"
const todoSchema = new mongoose.Schema({
    //Campo "title": representa el título o nombre de la tarea. Es una cadena de texto y es obligatorio
    title: { type: String, required: true },

    //Campo "completed": indica si la tarea ya fue completada o no. Es un booleano y su valor por defecto es false
    completed: { type: Boolean, default: false },

    //Campo "userId": hace referencia al usuario que creó la tarea. Es obligatorio y debe ser un ObjectId (ID de MongoDB)
    //La propiedad "ref: 'User'" indica que se relaciona con el modelo "User". Esto permite usar métodos como `.populate()` para acceder a los datos del usuario
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }
}, 
{
    //Opciones adicionales del esquema
    //"timestamps: true" agrega automáticamente los campos "createdAt" y "updatedAt" en cada documento creado con este esquema
    timestamps: true
});
// Crea y exporta el modelo "Todo" basado en el esquema definido. Este modelo será usado para interactuar con la colección "todos" en MongoDB
export default mongoose.model("Todo", todoSchema);