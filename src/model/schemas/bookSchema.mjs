import mongoose from "mongoose";
import Category from "./categorySchema.mjs";

const bookSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: "User" 
    },
    authors: { 
        type: [String], 
        required: true 
    },
    publishedDate: { 
        type: Date 
    },
    description: { 
        type: String 
    },
    categories: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Category" 
    }],
}, 
{ 
    timestamps: true
});
//Para que no se repitan libros de titulo y autor
bookSchema.index({ title: 1, authors: 1 }, { unique: true });

export default bookSchema;