const mongoose = require('mongoose');

const chemicalSchema = new mongoose.Schema({
  name: String,
  unit: String,
  chemicalType: String,
  casNumber: String,
  hBondAcceptor: String,
  hBondDonor: String,
  iupacName: String,
  inchlKey: String,
  molecularWeight: String,
  synonyms: String,
  chemicalIndustries: String,
  image: String // For storing the image path or base64 string
});

const Chemical = mongoose.model('Chemical', chemicalSchema);
module.exports = Chemical;
