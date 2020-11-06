const mongoose = require('mongoose');
const Theme = require('./Theme');

const divisionSchema = new mongoose.Schema({
  title: String,
});

divisionSchema.methods.showThemes = async function () {
  const themes = await this.model('Theme')
    .find({ division: this._id })
    .populate('author');
  return themes;
};

module.exports = mongoose.model('Division', divisionSchema);
