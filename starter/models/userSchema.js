let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: false,
      maxLength: 13,
    },
    password: {
      type: String,
      maxLength: 100,
      minLength: 9,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    refreshJWT: {
      token: {
        type: String,
        maxlength: 500,
        default: '',
      },
      addedAt: {
        type: Date,
        required: true,
        default: Date.now(),
      },
    },
  },
  { timestamps: true }
);
const User = mongoose.model('User', UserSchema);

module.exports = User;
