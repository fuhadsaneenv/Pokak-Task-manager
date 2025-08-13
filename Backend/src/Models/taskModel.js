import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  color: String,
  repeat: { type: String, enum: ['daily', 'weekly', 'monthly'], default: 'daily' },
  tag: String,
  completed: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);
