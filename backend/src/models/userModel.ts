/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true, maxLength: 35 },
  password: { type: String, required: true, minLength: 8 },
  likedMovies: { type: mongoose.SchemaTypes.Mixed, required: true },
  dislikedMovies: [{ title: String, id: Number }],
});

// I grabbed this from a previous project. I run into a timeout error when trying to encrypt a users
// password before sending the data to Mongoose as it takes too long to encrypt the password before
// sending it to Mongoose to be saved into the MongoDB instance. Doing it here gets around that.
UserSchema.pre('save', function (next) {
  const user = this;

  bcrypt.genSalt(10, function (err: any, salt: any) {
    if (err) return next(err);

    // eslint-disable-next-line no-shadow
    bcrypt.hash(user.password, salt, function (err: any, hash: any) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

export default mongoose.model('User', UserSchema);
