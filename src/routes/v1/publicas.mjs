import express from "express";
import { login, signup } from "../../controller/v1/auth-controller.mjs";
import { validateRequest } from "../../middlewares/validation-middleware.mjs";
import { validateLogin, validateSingup } from "../../validations/validation-user.mjs";
import reqValidate from "../../constants/request-validate-constants.mjs";

const rutasPublicas = express.Router();

rutasPublicas.post("/signup", validateRequest(validateSingup, reqValidate.BODY), signup);
rutasPublicas.post("/login", validateRequest(validateLogin, reqValidate.BODY), login);

export default rutasPublicas;