import categoryMongoRepository from "./mongo-repository/category-mon-Repository.mjs";
import { baseConstant } from "../constants/base-constant.mjs";
import 'dotenv/config';

let categoryRepository;
categoryRepository = categoryMongoRepository;

export default categoryRepository; 