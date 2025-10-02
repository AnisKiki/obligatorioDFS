import bookMongoRepository from "./mongo-repository/book-mon-Repository.mjs";
import { baseConstant } from "../constants/base-constant.mjs";
import 'dotenv/config';

let bookRepository;
bookRepository = bookMongoRepository;

export default bookRepository; 