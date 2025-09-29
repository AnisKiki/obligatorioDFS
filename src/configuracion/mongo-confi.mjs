//Importa Mongoose, la librería para interactuar con MongoDB desde Node.js
import mongoose from "mongoose";
import { baseConstant } from "../constants/base-constant.mjs";
//Importa las variables de entorno definidas en el archivo .env
import "dotenv/config";

//Extrae las variables de entorno necesarias para construir la URL de conexión
const {
    MONGO_URL, 
    MONGO_PORT, //Puerto donde escucha MongoDB (ej. 27017)
    MONGO_DB, //Nombre de la base de datos a usar
    MONGO_LOCAL, 
    MONGO_HOST, //Host donde está corriendo MongoDB (ej. localhost)
    MONGO_ATLAS 
} = process.env;
//Construye la URI de conexión a MongoDB usando las variables anteriores
//  const MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

let MONGO_URI;
if (MONGO_HOST == MONGO_LOCAL) {
    MONGO_URI = `mongodb://${MONGO_URL}:${MONGO_PORT}/${MONGO_DB}`;

} else {
    MONGO_URI = `mongodb://${MONGO_URL}:${MONGO_PORT}/${MONGO_DB}`;
}

//Función asíncrona para conectar a la base de datos MongoDB
export async function connectMongo() {
    try {
        //Se intenta conectar usando Mongoose con opciones recomendadas
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true, //Para usar el nuevo parser de URLs
            useUnifiedTopology: true //Para usar el nuevo motor de monitoreo
        });
        //Si la conexión es exitosa, imprime mensaje en consola
        console.log("Conectado a MongoDB correctamente");
    } catch (err) {
        //Si hay error al conectar, imprime el error en consola
        console.error("Error al conectar a MongoDB:", err.message);
        //Termina la ejecución de la aplicación ya que no puede continuar sin DB
        process.exit(1);
    }
}
connectMongo();