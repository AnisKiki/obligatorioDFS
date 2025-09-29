// repositories/user-repository.js
import todoMongoRepository from "../repositories/mongo-repository/toDo-mon-Repository.mjs";
import { baseConstant } from "../constants/base-constant.mjs";
import 'dotenv/config';

//Se agrega como capa intermedia entre los controladores y el modelo. En el momento que se quiera cambiar de base de datos por ejemplo se indica en el archivo env la base que se quiere usar y se la retorna
let todoRepository;

//En el ejemplo solo tenemos la base mongo
/* if (process.env.DB === "mysql") {
  todoRepository = todoMongoRepository; //Aca iria la base mysql
} else {
  todoRepository = todoMongoRepository;
} */
if (process.env.BASE_IN_USE == baseConstant.MONGO) {
    todoRepository = todoMongoRepository;
}
export default todoRepository;