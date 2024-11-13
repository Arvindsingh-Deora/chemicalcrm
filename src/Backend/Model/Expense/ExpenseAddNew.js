const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  date: Date,
  reference: String,
  amount: Number,
  category: String,
  user: String,
  note: String,
});

module.exports = mongoose.model('Expense', expenseSchema);


