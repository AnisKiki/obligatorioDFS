import mongoose from "mongoose";
import bookSchema from "./schemas/bookSchema.mjs";

const Book = mongoose.model("Book", bookSchema);

export default Book;
