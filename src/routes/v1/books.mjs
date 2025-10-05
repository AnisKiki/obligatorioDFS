import express from "express";
import { validateRequest } from "../../middlewares/validation-middleware.mjs";
import { authMiddleware } from "../../middlewares/auth-middleware.mjs";
import { validateCreate, validateDelete, validateUpdate } from "../../validations/validation-book.mjs";
import { createBook, deleteBook, getListOfBooks, getBookDetails, editBook } from "../../controller/v1/book-controller.mjs";
import reqValidate from "../../constants/request-validate-constants.mjs";
const rutasLibros = express.Router();

rutasLibros.post("/alta-libro/", authMiddleware, validateRequest(validateCreate, reqValidate.BODY), createBook);
rutasLibros.delete("/baja-libro/:id", authMiddleware, validateRequest(validateDelete, reqValidate.PARAM), deleteBook);
rutasLibros.get("/listar-libros/", authMiddleware, getListOfBooks);
rutasLibros.get("/detalles-libro/:id", authMiddleware, validateRequest(validateDelete, reqValidate.PARAM), getBookDetails);
rutasLibros.put("/editar-libro/:id", authMiddleware, validateRequest(validateUpdate, reqValidate.PARAM), editBook);

export default rutasLibros;