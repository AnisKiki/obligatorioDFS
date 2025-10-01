import express from "express";
import dotenv from "dotenv";
/* import { AgregarTarea, ObtenerListaTareas, ObtenerUnaTarea } from "./stores/toDos.mjs";
import { validateBody, validateParams } from "./middlewares/validarToDos.mjs";
import { idParamSchema, newToDoSchema } from "./schemas/toDosSchemas.mjs"; */
import { connectMongo } from "./config/mongo-config.mjs";
import { connectRedis } from "./config/redis-config.mjs";
import rutasPublicas from "./routes/v1/publicas.mjs";
import { xssSanitizer } from "./middlewares/sanitizer-middleware.mjs";
import { connect } from "mongoose";


//Cargar variables de entorno antes de usar cualquier configuracion que dependa de ellas.
dotenv.config();
//Crear intancia de Express para configurar el servidor
const app = express();
//Middleware para parsear JSON en el body de las solicitudes
app.use(express.json());
//Conectar a la base de datos MongoDB (función asíncrona, no esperamos aquí)
connectMongo();
connectRedis();
//Puerto en el que escuchará el servidor, por defecto 3000 si no está definido en .env
const port = process.env.PORT ?? 3000;

//Rutas públicas (version 1)
app.use("/api/v1", rutasPublicas);
//middelware sanitizado
app.use(xssSanitizer)

//Levantar el servidor y escuchar en el puerto definido
app.listen(port, () => {
    console.log(`Server on port ${port}`);
});

//Middleware para manejar rutas no encontradas (404)
app.use((err, req, res, next) => {
    console.log('err', err)
    if (err.message) {
        res.status(err.statusCode).json({ message: err.message });
    } else {
        res.status(500).json({ message: "Error no controlado" });
    }

});