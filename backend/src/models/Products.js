import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },       // FIXED (used `description`)
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  category: { type: String },
  images: [{ type: String }],           // FIXED (used `images`)
  quantity: { type: Number, default: 0 },
  sizes: [{ type: String }],
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

export default mongoose.model("Products", productSchema);
