// models/Customer.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  chemicalName: { type: String, required: true },
  supplierName: { type: String, required: true },
  date: { type: Date, required: true },
  phoneNumber: { type: String, required: true }
});

module.exports = mongoose.model('customer', customerSchema);
