import express from "express";
const v1RutasUsuarios = express.Router();
import { cambiarPlan } from "../../controller/user-controller.mjs";
import { validateAuth } from "../../validations/validation-user.mjs";
import { authMiddleware } from "../../middlewares/auth-middleware.mjs";
const routes = express.Router();

routes.post("/cambiar-plan/:userId", authMiddleware, cambiarPlan);

// v1RutasUsuarios.put("/:id", actualizarUsuario);
// v1RutasUsuarios.patch("/:id", modificarUsuario);

export default v1RutasUsuarios;