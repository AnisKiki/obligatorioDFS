import mongoose from "mongoose";
import categorySchema from "./schemas/categorySchema.mjs";

const Category = mongoose.model("Category", categorySchema);

export default Category;