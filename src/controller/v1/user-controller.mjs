import userRepository from "../../repositories/user-repository.mjs";
import "dotenv/config";

export async function cambiarPlan(req, res) {
    try {
        const user = req.user;  // req.user ya contiene el objeto completo del usuario
        const { plan } = req.body;  // Extraer el plan del body de la petición
        
        const viejo = await userRepository.getUserById(user.id);
        if (!viejo) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        if (viejo.plan === plan) {
            return res.status(409).json({ error: `El usuario ya tiene el plan ${plan}` });
        }

        const userUpdated = await userRepository.update(user.id, { plan });
        if (!userUpdated) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Plan cambiado exitosamente", user: userUpdated });
    } catch (error) {
        res.status(500).json({ error: "Ocurrió un error al cambiar el plan, intentelo de nuevo más tarde" });
    }
}