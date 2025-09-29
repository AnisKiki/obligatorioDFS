import express from "express";
const v1RutasUsuarios = express.Router();
import { createUser } from "../../controller/user-controller.mjs";
const routes = express.Router();

routes.post("/", createUser);

// v1RutasUsuarios.put("/:id", actualizarUsuario);
// v1RutasUsuarios.patch("/:id", modificarUsuario);

export default v1RutasUsuarios;