import React, { useState  , useEffect} from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import '../../Style/Expense/ExpenseAddNew.css';

const ExpenseAddNew = () => {
  const [date, setDate] = useState(null);
  const [reference, setReference] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [user, setUser] = useState('');
  const [note, setNote] = useState('');
  const [categories, setCategories] = useState([]);



  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const expenseData = { date, reference, amount, category, user, note };
      await axios.post('http://localhost:5000/add', expenseData);
      alert('Expense saved successfully!');
    } catch (error) {
      alert('Error saving expense');
      console.error(error);
    }
  };

  return (
    <div className="expense-form-container">
      <h2>Expense Add New</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        
        {/* First Row: Date and Reference */}
        <div className="expense-form-row">
          <div className="expense-form-group">
            <label>Date</label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              placeholderText="Select Date"
              className="form-control expense-date-picker"
            />
          </div>
          <div className="expense-form-group">
            <label>Reference</label>
            <input
              type="text"
              className="form-control"
              placeholder="Reference"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
            />
          </div>
        </div>

        {/* Second Row: Amount, Expense Category, and User */}
        <div className="expense-form-row">
          <div className="expense-form-group">
            <label>Amount</label>
            <input
              type="number"
              className="form-control"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="expense-form-group">
            <label>Expense Category</label>
            <select
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="expense-form-group">
            <label>User</label>
            <input
              type="text"
              className="form-control"
              placeholder="User"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
        </div>

        {/* Third Row: Note */}
        <div className="expense-form-group">
          <label>Note</label>
          <textarea
            className="form-control"
            placeholder="Add a note"
            rows="3"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>

        {/* Save Button */}
        <button type="submit" className="save-button">
          <i className="fas fa-save"></i> Save
        </button>
      </form>
    </div>
  );
};

export default ExpenseAddNew;
