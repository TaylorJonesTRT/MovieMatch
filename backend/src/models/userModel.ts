/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true, maxLength: 35 },
  password: { type: String, required: true, minLength: 8 },
});

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

module.exports = mongoose.model('User', UserSchema);
