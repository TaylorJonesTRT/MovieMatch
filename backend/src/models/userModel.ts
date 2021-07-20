/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  githubID: { type: String, required: true, },
  likedMovies: { type: mongoose.SchemaTypes.Mixed, required: true },
  dislikedMovies: [{ title: String, id: Number }],
});

export default mongoose.model('User', UserSchema);
