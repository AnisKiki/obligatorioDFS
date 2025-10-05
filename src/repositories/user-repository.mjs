//Repositories/user-repository.js
import userMongoRepository from "./mongo-repository/user-mon-Repository.mjs";
import { baseConstant } from "../constants/base-constant.mjs";
import 'dotenv/config';

let userRepository;
userRepository = userMongoRepository;

export default userRepository; 