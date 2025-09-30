import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    capacity: { type: Number, required: true },
    unlimited: { type: Boolean, default: false }
}, {
    timestamps: true
});
export default planSchema;