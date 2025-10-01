import userRepository from "../repositories/user-repository.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const cambiarPlan = async (req, res) => {
    try {
        const {user} = req.params.user;
        const { plan } = req.body;

        const userUpdated = await userRepository.updateUserPlan(user.id, plan);
        if (!userUpdated) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Plan cambiado exitosamente", user: userUpdated });
    } catch (error) {
        res.status(500).json({ message: "Error al cambiar el plan", error });
    }
}

