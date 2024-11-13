// backend/model/Supplier.js
const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  supplierName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  website: { type: String },
  mobileNumber: { type: String },
  phoneNumber: { type: String },
  address: { type: String },
  country: { type: String },
  city: { type: String },
  description: { type: String },
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
