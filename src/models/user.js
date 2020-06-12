const mongoose = require('mongoose');
require('../db/moongose');
const validator = require('validator');

const User = mongoose.model('User', {
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot not contain password');
      }
    },
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

// const user = {
//   name: 'Akeju',
//   email: 'yanmifeakeju@gmail.con',
//   password: 'firstinits',
// };

// const addNewUser = async (userInfo) => {
//   const user = new User(userInfo);
//   try {
//     await user.save();
//     console.log(user);
//   } catch (error) {
//     console.log(error);
//   }
// };

// addNewUser(user);

module.exports = User;
