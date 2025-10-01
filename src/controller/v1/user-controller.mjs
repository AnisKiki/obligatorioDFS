import userRepository from "../../repositories/user-repository.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export async function cambiarPlan(req, res) {
    try {
        const user = req.user;  // req.user ya contiene el objeto completo del usuario
        const { plan } = req.body;  // Extraer el plan del body de la petición
        
        console.log('Usuario autenticado:', user);
        console.log('Plan solicitado:', plan);

        const userUpdated = await userRepository.update(user.id, { plan });
        if (!userUpdated) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Plan cambiado exitosamente", user: userUpdated });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al cambiar el plan", error });
    }
}

