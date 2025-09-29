import express from "express";
import { login, signup } from "../../controller/v1/auth-controller.mjs";
import { authMiddleware } from "../../middlewares/authmiddleware";
import { addTodo, editTodo, getTodoById, listTodos, getTodosByUser, createTodo, deleteTodo } from "../../controller/v1/todo-controller.mjs";
import { validateRequest } from "../../middleware/validation.middleware.mjs";
import reqValidate from "../../constants/request-validate-constants.mjs";
import { authMiddleware } from "../../middleware/auth-middleware.mjs";

const v1RutasTareas = express.Router();
//middleware autenticacion
routes.use(authMiddleware);

//Se agrega un middleware que probablemente asigne datos al req los datos son obtenidos del token de JWT por ejemplo userid, email, etc
v1RutasTareas.use(authMiddleware);
v1RutasTareas.get("/", listTodos);
v1RutasTareas.get("/:id", getTodoById);
v1RutasTareas.post("/", addTodo);
v1RutasTareas.put("/:id", editTodo);

routes.get("/", getTodosByUser);
routes.post("/", validateRequest(validateCreateTodo, reqValidate.BODY), createTodo);
routes.get("/:id", validateRequest(validateGetTodoById, reqValidate.PARAM), getTodoById);
routes.delete("/", deleteTodo);
routes.delete("/:id", deleteTodo);
// routes.put("/", controlador);
// routes.patch("/:id", controlador);

export default v1RutasTareas;