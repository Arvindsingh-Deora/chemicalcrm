import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../Style/ChemicalPreview.css';

const ChemicalPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData } = location.state || {};

  const handleBack = () => {
    navigate('/chemical/Add New');
  };

 

  const handleFinalSubmit = async () => {
    try {
      // Perform the final submission (save to MongoDB)
      await axios.post('http://localhost:5000/api/chemicals', formData);
      alert('Form submitted successfully!');
      // Redirect to the home or list page
      navigate('/chemical/List');
    } catch (error) {
      console.error('Error submitting form data:', error);
      alert('Failed to submit data.');
    }
  };


  return (
    <div className="chemical-preview-container">
      <h1 className="chemical-preview-title">Chemical Data Preview</h1>
      <p className="chemical-preview-detail"><strong>Chemical Name:</strong> {formData?.Name}</p>
      <p className="chemical-preview-detail"><strong>Unit:</strong> {formData?.Unit}</p>
      <p className="chemical-preview-detail"><strong>Chemical Type:</strong> {formData?.Types}</p>
      <p className="chemical-preview-detail"><strong>CAS Number:</strong> {formData?.CAS}</p>
      <p className="chemical-preview-detail"><strong>H Bond Acceptor:</strong> {formData?.Acceptor}</p>
      <p className="chemical-preview-detail"><strong>H Bond Donor:</strong> {formData?.Donor}</p>
      {/* <p className = "chemical-preview-detail"><strong>Images:</strong>{formData?.Image}</p> */}

      {/* Submit and Back Buttons */}
      <div className="button-container">
        <button className="submit-btn" onClick={handleFinalSubmit}>Submit</button>
        <button className="back-btn" onClick={handleBack}>Back</button>
      </div>
    </div>
  );
};

export default ChemicalPreview;
