import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    planId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Plan" },
    role: { 
        type: String, 
        enum: ["user", "admin", "moderator"], 
        required: true, 
        default: "user" 
    }
}, {
    timestamps: true
});
export default userSchema;