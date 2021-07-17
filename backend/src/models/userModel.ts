/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const UserSchema = new Schema({
  // username: { type: String, required: true, maxLength: 35 },
  // password: { type: String, required: true, minLength: 8 },
  githubID: { type: String, required: true, },
  likedMovies: { type: mongoose.SchemaTypes.Mixed, required: true },
  dislikedMovies: [{ title: String, id: Number }],
});

export default mongoose.model('User', UserSchema);
