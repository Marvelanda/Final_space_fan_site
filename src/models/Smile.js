const mongoose = require('mongoose');

const smileSchema = new mongoose.Schema({
  image: Buffer,
  htmlImage: String,
});

module.exports = mongoose.model('Smile', smileSchema);
