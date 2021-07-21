/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  _id: Number,
  githubID: { type: String, required: true },
  likedMovies: [
    {
      title: String,
      id: String,
      description: String,
      runTime: String,
    },
  ],
  dislikedMovies: [
    {
      title: String,
      id: String,
      description: String,
      runTime: String,
    },
  ],
});

export default mongoose.model('User', UserSchema);
