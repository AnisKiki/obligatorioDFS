import express from "express";
import { cambiarPlan } from "../../controller/v1/user-controller.mjs";
import { validateRequest } from "../../middlewares/validation-middleware.mjs";
import { authMiddleware } from "../../middlewares/auth-middleware.mjs";
import { validateChangePlan } from "../../validations/validation-user.mjs";
import reqValidate from "../../constants/request-validate-constants.mjs";
const rutasUsuario = express.Router();

rutasUsuario.patch("/cambiar-plan/", authMiddleware, validateRequest(validateChangePlan, reqValidate.BODY), cambiarPlan);

export default rutasUsuario;