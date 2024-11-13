import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFilePdf, FaFileExcel } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import '../../Style/Expense/ExpenseList.css';

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/expenses');
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleEdit = (expense) => {
    setEditData(expense);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/expense/update/${editData._id}`, editData);
      alert('Expense updated successfully!');
      setEditData(null);
      fetchExpenses();
    } catch (error) {
      alert('Error updating expense');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/expense/delete/${id}`);
      setExpenses(expenses.filter((expense) => expense._id !== id));
      alert('Expense deleted successfully!');
    } catch (error) {
      alert('Error deleting expense');
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Expense List", 20, 10);
    doc.autoTable({
      head: [['Date', 'Reference', 'Amount', 'Category', 'User', 'Note']],
      body: expenses.map((expense) => [
        new Date(expense.date).toLocaleDateString(),
        expense.reference,
        expense.amount,
        expense.category,
        expense.user,
        expense.note,
      ]),
    });
    doc.save("ExpenseList.pdf");
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      expenses.map((expense) => ({
        Date: new Date(expense.date).toLocaleDateString(),
        Reference: expense.reference,
        Amount: expense.amount,
        Category: expense.category,
        User: expense.user,
        Note: expense.note,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    XLSX.writeFile(workbook, "ExpenseList.xlsx");
  };

  return (
    <div>
      <h2>Expense List</h2>
      
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Search by Reference"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: '10px', padding: '5px', width: '200px' }}
        />
        <button onClick={downloadPDF} style={{ marginRight: '10px' }}>
          <FaFilePdf style={{ marginRight: '5px' }} /> Download PDF
        </button>
        <button onClick={downloadExcel}>
          <FaFileExcel style={{ marginRight: '5px' }} /> Export to Excel
        </button>
      </div>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Reference</th>
            <th>Amount</th>
            <th>Category</th>
            <th>User</th>
            <th>Note</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.filter(expense => expense.reference.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((expense) => (
              <tr key={expense._id}>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>{expense.reference}</td>
                <td>{expense.amount}</td>
                <td>{expense.category}</td>
                <td>{expense.user}</td>
                <td>{expense.note}</td>
                <td>
                  <button onClick={() => handleEdit(expense)}>Edit</button>
                  <button onClick={() => handleDelete(expense._id)}>Delete</button>
                </td>
              </tr>
          ))}
        </tbody>
      </table>

      {editData && (
        <div className="edit-modal">
          <h3>Edit Expense</h3>
          <form>
            <input
              name="reference"
              value={editData.reference}
              onChange={handleInputChange}
              placeholder="Reference"
            />
            <input
              name="amount"
              value={editData.amount}
              onChange={handleInputChange}
              placeholder="Amount"
            />
            <input
              name="category"
              value={editData.category}
              onChange={handleInputChange}
              placeholder="Category"
            />
            <button type="button" onClick={handleUpdate}>Save</button>
            <button type="button" onClick={() => setEditData(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Expense;
