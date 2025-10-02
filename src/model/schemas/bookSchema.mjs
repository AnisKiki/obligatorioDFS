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

export default bookSchema;