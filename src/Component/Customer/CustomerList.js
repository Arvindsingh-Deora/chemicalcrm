import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../../Style/Customer/Customerlist.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    chemicalName: '',
    supplierName: '',
    date: '',
    phoneNumber: ''
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/customers');
        setCustomers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customer data:', error);
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEditClick = (customer) => {
    setCurrentCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      chemicalName: customer.chemicalName,
      supplierName: customer.supplierName,
      date: customer.date.split('T')[0],
      phoneNumber: customer.phoneNumber
    });
    setEditMode(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/customers/${currentCustomer._id}`, formData);
      alert(response.data.message);
      setEditMode(false);
      setCustomers(customers.map(customer =>
        customer._id === currentCustomer._id ? response.data.customer : customer
      ));
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const handleDelete = async (customerId) => {
    try {
      await axios.delete(`http://localhost:5000/customers/${customerId}`);
      setCustomers(customers.filter(customer => customer._id !== customerId));
      alert('Customer deleted successfully');
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Customer List", 10, 10);
    doc.autoTable({
      head: [['Name', 'Email', 'Chemical Name', 'Supplier Name', 'Date', 'Phone Number']],
      body: customers.map(customer => [
        customer.name,
        customer.email,
        customer.chemicalName,
        customer.supplierName,
        new Date(customer.date).toLocaleDateString(),
        customer.phoneNumber,
      ]),
    });
    doc.save("CustomerList.pdf");
  };

  return (
    <div className="customer-list-container">
      <h2>Customer List</h2>
      <button className="download-btn" onClick={downloadPDF}>
      <i class="ri-file-pdf-2-fill"></i> Download PDF
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="customer-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Chemical Name</th>
              <th>Supplier Name</th>
              <th>Date</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="7">No customers found</td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.chemicalName}</td>
                  <td>{customer.supplierName}</td>
                  <td>{new Date(customer.date).toLocaleDateString()}</td>
                  <td>{customer.phoneNumber}</td>
                  <td>
                    <div className="button-container">
                      <button onClick={() => handleEditClick(customer)}>
                        <i className="ri-pencil-fill"></i>
                      </button>
                      <button onClick={() => handleDelete(customer._id)}>
                        <i className="ri-delete-bin-5-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {editMode && (
        <div className="edit-form-container">
          <h3>Edit Customer</h3>
          <form onSubmit={handleUpdateSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Chemical Name</label>
              <input
                type="text"
                name="chemicalName"
                value={formData.chemicalName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Supplier Name</label>
              <input
                type="text"
                name="supplierName"
                value={formData.supplierName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
