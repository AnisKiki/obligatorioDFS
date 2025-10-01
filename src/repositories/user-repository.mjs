//Repositories/user-repository.js
import userMongoRepository from "./mongo-repository/user-mon-Repository.mjs";
import { baseConstant } from "../constants/base-constant.mjs";
import 'dotenv/config';

// ver comentarios en user-repository
let userRepository;
/* if (process.env.DB === "mysql") {
  userRepository = userMongoRepository;
} else {
  userRepository = userMongoRepository;
}*/
if (process.env.BASE_IN_USE == baseConstant.MONGO) {
  userRepository = userMongoRepository;
}else{
  userRepository = userMongoRepository;
}

export default userRepository; 