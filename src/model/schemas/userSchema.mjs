import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    plan: { 
        type: String, 
        enum: ["Premium", "Plus"], 
        required: true, 
        default: "user" 
    },
    role: { 
        type: String, 
        enum: ["user", "admin", "moderator"], 
        required: true, 
        default: "user" 
    }
}, {
    timestamps: true
});

userSchema.index({ email: 1 }, { unique: true });

export default userSchema;