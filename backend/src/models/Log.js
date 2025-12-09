import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  action: {type: String, required: true},
  description: { type: String, required: true},
  createdAt: { type: Date, default: Date.now}
})

export default mongoose.model('Logs', logSchema);