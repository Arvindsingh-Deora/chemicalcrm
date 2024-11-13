
import React, { useState } from 'react';

import '../../../src/Style/Supplier/SupplierAddNew.css'

const SupplierAddNew = () => {
  const [supplierName, setSupplierName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleSave = async () => {
    setShowAlert(false);  // Reset alert
    const supplierData = {
      supplierName,
      contactPerson,
      email,
      website,
      mobileNumber,
      phoneNumber,
      address,
      country,
      city,
      description,
    };

    try {
      const response = await fetch('http://localhost:5000/api/suppliers', {  // Update to POST method
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(supplierData),
      });

      if (!response.ok) throw new Error('Error adding supplier');

      setShowAlert(true);  // Show success alert if data is submitted successfully
      console.log('Data submitted successfully!');
    } catch (error) {
      console.error('Error adding supplier:', error);
    }
  };
  const handleCancel = () => {
    setShowForm(false); // Hide the form when "Cancel" is clicked
  };
  return (
    <>
    {showAlert && (
        <div className="custom-alert">
          <div className="custom-alert-content">
            <p>Data submitted successfully!</p>
            <button onClick={() => setShowAlert(false)}>OK</button>
          </div>
        </div>
      )}
    <form className="supplier-add-new" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
    <div className="form-row">
      <div className="form-group">
        <label>Supplier Name</label>
        <input type="text" value={supplierName} onChange={(e) => setSupplierName(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Contact Person</label>
        <input type="text" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
    </div>
  
    <div className="form-row">
      <div className="form-group">
        <label>Website</label>
        <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Mobile Number</label>
        <input type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Phone Number</label>
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>
    </div>
  
    <div className="form-row">
      <div className="form-group">
        <label>Address</label>
        <textarea value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Country</label>
        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
      </div>
      <div className="form-group">
        <label>City</label>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      </div>
    </div>
  
    <div className="form-row">
      <div className="form-group">
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
    </div>
  
    <div className="form-actions">
      <button type="submit">Save</button>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </div>
  </form>
  </>
  );
};





export default SupplierAddNew;

