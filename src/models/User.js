const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
  },
  email: { type: String, unique: true, required: true, minlength: 8 },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
});

module.exports = mongoose.model('User', userSchema);
