import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
    users: {type: Number, default: 0},
    products: {type: Number, default: 0},
    interactions: [
        {
            date: String,
            favorites: Number
        }
    ],
    reviews: [
        {
            stars: Number,
            count: Number
        }
    ]

}, { timestamps: true });

export default mongoose.model("Analytics", analyticsSchema);