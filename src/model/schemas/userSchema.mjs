import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    plan: { 
        type: String, 
        enum: ["premium", "plus"], 
        required: true, 
        default: "plus" 
    },
    role: { 
        type: String, 
        enum: ["user", "admin"], 
        required: true, 
        default: "user" 
    }
}, {
    timestamps: true
});

userSchema.index({ email: 1 }, { unique: true });

export default userSchema;