import mongoose from 'mongoose';

const { Schema } = mongoose;

const MovieSchema = new Schema({
  title: { type: String, required: true, maxLength: 150 },
  description: { type: String, required: true, maxLength: 400 },
  runTime: { type: Number, required: true },
  liked: { type: Boolean, required: true },
  belongsTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

// Exporting
module.exports = mongoose.model('Movie', MovieSchema);
