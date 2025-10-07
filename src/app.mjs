import express from "express";
import dotenv from "dotenv";
import { connectMongo } from "./config/mongo-config.mjs";
import rutasPublicas from "./routes/v1/publicas.mjs";
import rutasUsuario from "./routes/v1/users.mjs";
import rutasaBooks from "./routes/v1/books.mjs";
import rutasCategorias from "./routes/v1/categories.mjs";
import { xssSanitizer } from "./middlewares/sanitizer-middleware.mjs";

dotenv.config();
const app = express();

app.use(express.json());
app.use(xssSanitizer);

// Conectar a las bases de datos de forma asíncrona
(async () => {
    try {
        await connectMongo();
        console.log('Databases connected');
    } catch (error) {
        console.error('Database connection failed:', error);
        // En Vercel, continúa sin hacer crash de la app
    }
})();

const port = process.env.PORT ?? 3000;

app.use("/api/v1", rutasPublicas);
app.use("/api/v1/usuario", rutasUsuario);
app.use("/api/v1/libros", rutasaBooks);
app.use("/api/v1/categorias", rutasCategorias);

// Middleware para rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: "Ruta no encontrada" });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error('Error:', err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Error interno del servidor";
    res.status(statusCode).json({ message });
});

// Manejo de promesas rechazadas
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// app.listen(port, () => {
//     console.log(`Server on port ${port}`);
// });

export default app;