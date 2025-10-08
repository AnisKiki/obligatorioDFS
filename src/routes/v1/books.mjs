import express from "express";
import { validateRequest } from "../../middlewares/validation-middleware.mjs";
import { authMiddleware } from "../../middlewares/auth-middleware.mjs";
import { validateCreate, validateDelete, validateUpdate, validateUpdateBody, validateUpdateParams } from "../../validations/validation-book.mjs";
import { createBook, deleteBook, getListOfBooks, getBookDetails, editBook } from "../../controller/v1/book-controller.mjs";
import reqValidate from "../../constants/request-validate-constants.mjs";
const rutasLibros = express.Router();

rutasLibros.post("/", authMiddleware, validateRequest(validateCreate, reqValidate.BODY), createBook);
rutasLibros.delete("/:id", authMiddleware, validateRequest(validateDelete, reqValidate.PARAM), deleteBook);
rutasLibros.get("/", authMiddleware, getListOfBooks);
rutasLibros.get("/:id", authMiddleware, validateRequest(validateDelete, reqValidate.PARAM), getBookDetails);
rutasLibros.put("/:id", authMiddleware, validateRequest(validateUpdateParams, reqValidate.PARAM), validateRequest(validateUpdateBody, reqValidate.BODY), editBook);

export default rutasLibros;