import express from "express";
import { createBook } from "../../controller/v1/book-controller.mjs";
import { validateRequest } from "../../middlewares/validation-middleware.mjs";
import { authMiddleware } from "../../middlewares/auth-middleware.mjs";
import { validateCreate, validateDelete } from "../../validations/validation-book.mjs";
import { deleteBook } from "../../controller/v1/book-controller.mjs";
import { getListOfBooks } from "../../controller/v1/book-controller.mjs";
import reqValidate from "../../constants/request-validate-constants.mjs";
const rutasLibros = express.Router();

rutasLibros.post("/alta-libro/", authMiddleware, validateRequest(validateCreate, reqValidate.BODY), createBook);
rutasLibros.delete("/baja-libro/:id", authMiddleware, validateRequest(validateDelete, reqValidate.PARAM), deleteBook);
rutasLibros.get("/listar-libros/", authMiddleware, getListOfBooks);

export default rutasLibros;