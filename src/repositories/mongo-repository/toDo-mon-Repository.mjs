//Importa el modelo de la colección "Todo" desde el archivo Mongoose
//Este modelo define la estructura y validaciones de los documentos de tareas
import Todo from "../../model/mongo/todo.mjs";

//Objeto que actúa como repositorio para manejar las operaciones de base de datos relacionadas con las tareas (todos)
const todoMongoRepository = {
    //Crea una nueva tarea en la base de datos con los datos proporcionados
    async createTodo(data) {
        try {
            //Se crea una instancia del modelo con los datos
            const todo = new Todo(data)
            const tarea = await todo.save();
            //Se guarda en la base de datos
            console.log('tarea', tarea)
            return tarea;
        } catch (error) {
            console.log('No se pudo crear la tarea en mongo', error)
        }
    },
    //Obtiene todas las tareas que pertenecen a un usuario específico
    async getTodosByUser(data) {
        //Busca todas las tareas con ese userId
        const { userId, todoId } = data;
        return Todo.findOne(data);
    },
    //Obtiene una tarea por su ID, asegurándose de que pertenezca al usuario logueado. Esto evita que un usuario pueda acceder a tareas que no son suyas
    async getTodoById(todoId, userId) {
        //Busca por ID y por userId
        return await Todo.findOne({ _id: todoId, userId }); 
    },
    //Actualiza una tarea por su ID con los nuevos datos proporcionados
    // { new: true } devuelve el documento actualizado
    // { runValidators: true } aplica las validaciones definidas en el modelo
    async updateTodo(id, data) {
        return await Todo.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });
    },
    //Otra forma de actualizar una tarea
    /* async updateTodo() {
        return Todo.findOneAndUpdate(data);
    } */
    //todas las tareas del usuario
    async getAllTodos(data) {
        //validar
        const { userId } = data;
        return Todo.find(userId);
    },
    //borrar tarea
    async deleteTodo(data) {
        const { todoId } = data;
        if (todoId) {
            Todo.deleteOne(todoId);
        } else {
            return new Error("Hubo un error al borrar la tarea, el id no puede ser nulo");
        }
    },
    //reemplaza el viejo por el nuevo
    async replaceTodo(data) {
        return Todo.findOneAndReplace(data);
    },

};
// Exporta el repositorio para poder usarlo en otras partes del proyecto
export default todoMongoRepository;


// const userMongoRepository = {
// // POST -> Crear un todo
//  async function createTodo(data) {
//   const todo = new Todo(data);
//   return await todo.save();
// },
// // GET -> Listar todos los todos de un usuario
//  async function getTodosByUser(userId) {
//   return await Todo.find({ userId });
// },

// // PUT -> Actualizar todo completo por id
// async function updateTodoPut(id, data) {
//   // Reemplaza todos los campos, aplica validaciones
//   return await Todo.findByIdAndUpdate(id, data, { new: true, runValidators: true });
// },

// // PATCH -> Actualizar parcialmente por id
//  async function updateTodoPatch(id, data) {
//   // Solo modifica los campos enviados, aplica validaciones
//   return await Todo.findByIdAndUpdate(id, data, { new: true, runValidators: true });
// },

// // DELETE -> Eliminar un todo por id
//  async function deleteTodo(id) {
//   return await Todo.findByIdAndDelete(id);
// }
// }