import mongoose from "mongoose";
import planSchema from "./schemas/planSchema.mjs";

const Plan = mongoose.model("Plan", planSchema);

export default Plan;