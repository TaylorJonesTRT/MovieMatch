import mongoose from 'mongoose';

const { Schema } = mongoose;

const MovieSchema = new Schema({
  title: { type: String, required: true, maxLength: 150 },
  description: { type: String, required: true, maxLength: 400 },
  runTime: { type: Number, required: true },
});

// Exporting
export default mongoose.model('Movie', MovieSchema);
