import express from "express";
import { login, signup } from "../../controller/v1/auth-controller.mjs";
import { validateRequest } from "../../middlewares/validation-middleware.mjs";
import { validateLogin, validateSingup } from "../../validations/validation-user.mjs";
import reqValidate from "../../constants/request-validate-constants.mjs";

const rutasPublicas = express.Router();

//Se define la ruta para login y como segundo parametro se indica el controlador
rutasPublicas.post("/login", login);

//Se define la ruta para registro y como segundo parametro se indica el controlador
rutasPublicas.post("/singup", signup);

export default rutasPublicas;