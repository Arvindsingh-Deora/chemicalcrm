import React, { useState } from 'react';
import '../../Style/Inquiry/InquiryAddnew.css';

const InquiryAddNew = () => {
  // State variables to hold form data
  const [inquiryStatus, setInquiryStatus] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [sourceOfInquiry, setSourceOfInquiry] = useState('');
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const resetForm = () => {
    setInquiryStatus('');
    setAssignedTo('');
    setContactPerson('');
    setEmail('');
    setMobileNumber('');
    setPhone('');
    setWebsite('');
    setAddress('');
    setCity('');
    setCountry('');
    setSourceOfInquiry('');
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inquiryData = {
      inquiryStatus,
      assignedTo,
      contactPerson,
      email,
      mobileNumber,
      phone,
      website,
      address,
      city,
      country,
      sourceOfInquiry,
      message,
    };

    try {
      const response = await fetch('http://localhost:5000/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inquiryData),
      });


      // if (response.ok) {
      //   setAlertMessage('Inquiry saved successfully');
      //   setAlertType('success');
      //   setShowAlert(true);
      //   resetForm();
      // } else {
      //   setAlertMessage('Failed to save inquiry');
      //   setAlertType('error');
      //   setShowAlert(true);
      // }
      if (response.ok) {
        // Show success alert message
        setAlertMessage('Inquiry saved successfully!');
        setAlertType('success');
      //   setShowAlert(true);
        // Reset form
        resetForm();
        // Remove alert after 5 seconds
        setTimeout(() => {
          setAlertMessage('');
        }, 5000);
      } else {
        // Show failure alert message
        setAlertMessage('Failed to save inquiry. Please try again.');
        setAlertType('error');
         setShowAlert(true);
      }
    } catch (error) {
      console.error('Error saving inquiry:', error);
      setAlertMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="inquiry-form-container">
      <h2>Add New Inquiry</h2>
      {alertMessage && <div className="alert-box">{alertMessage}</div>}
      <form className="inquiry-form" onSubmit={handleSubmit}>
        <div className="inquiry-form-row">
          <div className="inquiry-form-group">
            <label htmlFor="inquiryStatus">Inquiry Status</label>
            <input
              type="text"
              id="inquiryStatus"
              value={inquiryStatus}
              onChange={(e) => setInquiryStatus(e.target.value)}
              required
            />
          </div>
          <div className="inquiry-form-group">
            <label htmlFor="assignedTo">Assigned To</label>
            <input
              type="text"
              id="assignedTo"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="inquiry-form-row">
          <div className="inquiry-form-group">
            <label htmlFor="contactPerson">Organization Contact Person</label>
            <input
              type="text"
              id="contactPerson"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              required
            />
          </div>
          <div className="inquiry-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="inquiry-form-row">
          <div className="inquiry-form-group">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              type="tel"
              id="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </div>
          <div className="inquiry-form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="inquiry-form-row">
          <div className="inquiry-form-group">
            <label htmlFor="website">Website</label>
            <input
              type="url"
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div className="inquiry-form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="inquiry-form-row">
          <div className="inquiry-form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="inquiry-form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="inquiry-form-row">
          <div className="inquiry-form-group">
            <label htmlFor="sourceOfInquiry">Source of Inquiry</label>
            <input
              type="text"
              id="sourceOfInquiry"
              value={sourceOfInquiry}
              onChange={(e) => setSourceOfInquiry(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="inquiry-form-row message-group">
          <div className="inquiry-form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              required
            />
          </div>
        </div>
        <div className="form-buttons">
          <button type="submit" className="save-button">Save</button>
          <button type="button" className="cancel-button" onClick={resetForm}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default InquiryAddNew;
