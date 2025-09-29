//Importa el repositorio de tareas que contiene la lógica de acceso a la base de datos
import todoRepository from "../../repositories/toDo-repository.mjs";
import { createError } from "../error/create-error.mjs";

//Crear un nuevo todo
export async function addTodo(req, res) {
    try {
        //Se construye el objeto con los datos del body y el ID del usuario autenticado. Se asume que req.user.id fue añadido por el middleware JWT
        const data = { ...req.body, userId: req.user.id };
        //Se crea la tarea en la base de datos
        const todo = await todoRepository.createTodo(data);
        //Respuesta exitosa con código 201 (creado)
        res.status(201).json(todo);
    } catch (err) {
        //Si hay error, responde con 400 (Bad Request) y el mensaje del error
        res.status(400).json({ error: err.message });
    }
}

//Listar todos los toDos del usuario autenticado
export async function listTodos(req, res) {
    try {
        //Busca todas las tareas asociadas al ID del usuario autenticado
        const todos = await todoRepository.getTodosByUser(req.user.id);
        //Responde con la lista de tareas
        res.json(todos);
    } catch (err) {
        //Si ocurre un error interno, responde con 500 (Internal Server Error)
        res.status(500).json({ error: err.message });
    }
}

//Obtener una sola tarea (todo) por su ID
/* export async function getTodoById(req, res) {
    try {
        const { id } = req.params;
        //Busca la tarea solo si pertenece al usuario autenticado
        const todo = await todoRepository.getTodoById({ _id: id, userId: req.user.id });
        //Si no existe, devuelve 404 (no encontrado)
        if (!todo) return res.status(404).json({ message: "Todo no encontrado" });
        //Devuelve la tarea encontrada
        res.json(todo);
    } catch (err) {
        //Si hay error (por ejemplo, ID mal formado), responde con 400
        res.status(400).json({ error: err.message });
    }
} */
export const getTodoById = async (req, res) => {
    const _id = req.params.id;
    const userId = req.user.id;
    const data = {
        _id, userId
    };
    const tarea = await todoRepository.getTodoByUser(data);
    res.status(200).json({ tarea });
}

//Actualizar un todo (PUT - reemplazo total)
export async function editTodo(req, res) {
    try {
        //Actualiza la tarea con los datos del body
        const todo = await todoRepository.updateTodo(req.params.id, req.body);
        //Devuelve la tarea actualizada
        res.json(todo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

//Actualización parcial de un todo (PATCH)
export async function patchTodo(req, res) {
    try {
        //Actualiza solo los campos enviados (parcial)
        const todo = await todoRepository.updateTodoPatch(req.params.id, req.body);
        //Si no se encontró la tarea, responde con 404
        if (!todo) return res.status(404).json({ message: "ToDo no encontrado" });
        //Devuelve la tarea actualizada parcialmente
        res.json(todo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

//Eliminar un todo
export async function removeTodo(req, res) {
    try {
        //Elimina la tarea según su ID
        await todoRepository.deleteTodo(req.params.id);
        //Devuelve un mensaje de éxito
        res.json({ message: "Todo eliminado" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const createTodo = async (req, res) => {
    try {
        const todo = req.body;
        const userId = req.user.id;
        todo.userId = userId;
        const todoSaved = await todoRepository.createTodo(todo);
        res.status(201).json({ tarea: todoSaved });
    } catch (error) {
        res.status(400).json({ message: "No pudo crear la tarea" });
    }
}

//obtener tareas del usuario 
export const getTodosByUser = async (req, res) => {
    console.log("entro en todo by id")
    try {
        if (true) {
            // return createError("No pudo obtener las tareas", 400);
            throw new Error("prueba");
        }
        console.log("entro en todo by id")
        const { id: userId } = req.user;
        const userTodos = await todoRepository.getAllTodos({ userId });
        res.status(200).json({ tareas: userTodos });
    } catch (error) {
        //res.status(400).json({ message: "No pudo obtener las tareas" }); 
        throw createError("No pudo obtener las tareas", 400);
    }
}

//borrar una tarea 
export const deleteTodo = async (req, res) => {
    try {
        console.log('entro en delete');
        const _id = req.params.id;
        await todoRepository.deleteTodo({ _id });
        res.status(200).json({ message: "Se borro correctamente" });
    } catch (error) {
        res.status(400).json({ message: "No pudo obtener las tareas" });
    }
}