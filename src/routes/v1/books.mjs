import express from "express";
import { validateRequest } from "../../middlewares/validation-middleware.mjs";
import { authMiddleware } from "../../middlewares/auth-middleware.mjs";
import { createBook } from "../../controller/v1/book-controller.mjs";
import { validateCreate } from "../../validations/validation-book.mjs";
import { validateDelete } from "../../validations/validation-book.mjs";
import { deleteBook } from "../../controller/v1/book-controller.mjs";
import reqValidate from "../../constants/request-validate-constants.mjs";
const rutasLibros = express.Router();

rutasLibros.post("/crear-libro/", authMiddleware, validateRequest(validateCreate, reqValidate.BODY), createBook);
rutasLibros.delete("/eliminar-libro/:id", authMiddleware, validateRequest(validateDelete, reqValidate.PARAMS), deleteBook);

export default rutasLibros;