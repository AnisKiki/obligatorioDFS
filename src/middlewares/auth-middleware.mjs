//Importa la librería jsonwebtoken para trabajar con JWT
import jwt from "jsonwebtoken";
//Importa las variables de entorno desde un archivo .env. Esto hace que process.env contenga JWT_SECRET y otras variables
import "dotenv/config";
import { validateAuth } from "../validations/validation-user.mjs";

//Obtiene la clave secreta desde las variables de entorno. Esta clave se usará para verificar la autenticidad del token JWT
/* const SECRET = process.env.JWT_SECRET; */
const SECRET = process.env.JWT_SECRET;

//Middleware de autenticación con JWT
export function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ message: "No token" });
        const token = authHeader.split(" ")[1];      
        const decoded = jwt.verify(token, SECRET);    
        const { error, value } = validateAuth.validate(decoded, { abortEarly: false });
        if (error) {
            res.status(401).json({ errors: error.details.map(d => d.message) })
        } else {
            req.user = value; //se asigna el usuario al req user
            next();
        }
    } catch (err) {
        res.status(401).json({ message: "Token inválido" }); //Si el token es inválido o ha expirado
    }
}