import userRepository from "../../repositories/user-repository.mjs";
import "dotenv/config";

export async function cambiarPlan(req, res) {
    try {
        const user = req.user;  // req.user ya contiene el objeto completo del usuario
        const { plan } = req.body;  // Extraer el plan del body de la petición
        
        const userUpdated = await userRepository.update(user.id, { plan });
        if (!userUpdated) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Plan cambiado exitosamente", user: userUpdated });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ocurrió un error al cambiar el plan, intentelo de nuevo más tarde" });
    }
}