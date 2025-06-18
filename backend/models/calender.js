import mongoose from 'mongoose';
const { Schema, model, Types } = mongoose;

const CalendarSchema = new Schema({
  date: { type: Number, required: true }, // You might want to use Date instead
  description: { type: String, required: true },
  created_by: { type: Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true // adds createdAt and updatedAt automatically
});

export default model('Event', CalendarSchema);
