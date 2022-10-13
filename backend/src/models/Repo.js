import mongoose from "mongoose";

export const Repo = mongoose.model('Repo', new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    userId: { type: String, required: true }
}, {
    timestamps: true 
})); 
