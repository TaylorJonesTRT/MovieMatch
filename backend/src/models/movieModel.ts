import mongoose from 'mongoose';

const { Schema } = mongoose;

const MovieSchema = new Schema({
  movieTitle: { type: String, required: true, maxLength: 150 },
  movieDescription: { type: String, required: true, maxLength: 400 },
  movieRunTime: { type: Number, required: true },
  liked: { type: Boolean, required: true },
});

// Exporting
module.exports = mongoose.model('Movie', MovieSchema);
