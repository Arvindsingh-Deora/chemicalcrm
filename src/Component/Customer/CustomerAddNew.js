// CustomerAddNew.js
import React, { useState } from 'react';
import axios from 'axios';
import '../../Style/Customer/CustomerAddNew.css';

const CustomerAddNew = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    chemicalName: '',
    supplierName: '',
    date: '',
    phoneNumber: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/customers', formData);
      alert(response.data.message);
      setFormData({
        name: '',
        email: '',
        chemicalName: '',
        supplierName: '',
        date: '',
        phoneNumber: ''
      });
    } catch (error) {
      console.error("There was an error saving the customer!", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Customer Information</h2>
      <form className="customer-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Chemical Name</label>
          <input type="text" name="chemicalName" value={formData.chemicalName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Supplier Name</label>
          <input type="text" name="supplierName" value={formData.supplierName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </div>
        <div className="form-submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CustomerAddNew;
