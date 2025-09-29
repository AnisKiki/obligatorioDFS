const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { 
        type: String, 
        enum: ["user", "admin", "moderator"], 
        required: true, 
        default: "user" 
    }
}, {
    timestamps: true
});
export default mongoose.model("User", userSchema);