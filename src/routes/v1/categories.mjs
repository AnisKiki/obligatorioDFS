import express from "express";
import { validateRequest } from "../../middlewares/validation-middleware.mjs";
import { authMiddleware } from "../../middlewares/auth-middleware.mjs";
import { getListOfCategories } from "../../controller/v1/category-controller.mjs";
import reqValidate from "../../constants/request-validate-constants.mjs";
const rutasCategorias = express.Router();

rutasCategorias.get("/", authMiddleware, getListOfCategories);

export default rutasCategorias;