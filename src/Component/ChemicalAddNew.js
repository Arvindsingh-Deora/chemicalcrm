import React, { useState } from 'react';
import axios from 'axios';
import '../Style/ChemicalAddnew.css';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />


const ChemicalAddNew = () => {
  const [formData, setFormData] = useState({
    name: '',
    unit: '',
    chemicalType: '',
    casNumber: '',
    hBondAcceptor: '',
    hBondDonor: '',
    iupacName: '',
    inchlKey: '',
    MolecularWeight: '',
    synonyms: '',
    chemicalIndustries: '',
    image: '' // Handle image file as base64 or file path
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Send data to backend
    const response = await axios.post('http://localhost:5000/api/chemicals', formData);
    console.log(response.data.message);
    alert('Chemical added successfully!');
  } catch (error) {
    console.error('Error adding chemical:', error);
  }
};

  return (
    <div className="chemical-management">
    <div className="">
      <h1>Manage Chemical</h1>
      <hr />
      
      <form className="chemical-form" onSubmit={handleSubmit}>
        {/* First Line: Name, Select Unit, and Chemical Types */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="unit">Select Unit</label>
            <select id="unit" name="unit" value={formData.unit} onChange={handleChange}>
              <option value="kg">Kg</option>
              <option value="g">Gram</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="chemical-type">Chemical Types</label>
            <select id="chemical-type" name="chemicalType"  value={formData.chemicalType} onChange={handleChange}>
              <option value="organic">Organic</option>
              <option value="inorganic">Inorganic</option>
            </select>
          </div>
        </div>

        {/* Second Line: CAS Number, H-Bond Acceptor, H-Bond Donor */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="cas-number">CAS Number</label>
            <input type="text" id="casNumber" name="casNumber" value = {formData.casNumber} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="h-bond-acceptor">H-Bond Acceptor</label>
            <input type="text" id="h-bond-acceptor" name="hBondAcceptor" value = {formData.hBondAcceptor}  onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="h-bond-donor">H-Bond Donor</label>
            <input type="text" id="h-bond-donor" name="hBondDonor" value = {formData.hBondDonor} onChange={handleChange} />
          </div>
        </div>

        {/* Third to Eighth Line */}
        <div className="form-rows">
          <div className="form-left">
            {/* 4th Line: IUPAC Name */}
            <div className="form-group">
              <label htmlFor="iupac-name">IUPAC Name</label>
              <input type="text" id="iupac-name" name="iupacName" value = {formData.iupacName} onChange={handleChange} />
            </div>
            
            {/* 5th Line: InchlKey */}
            <div className="form-group">
              <label htmlFor="inchl-key">InChlKey</label>
              <input type="text" id="inchl-key" name="inchlKey" value = {formData.inchlKey} onChange={handleChange} />
            </div>
            
            {/* 6th Line: Molecular Weight */}
            <div className="form-group">
              <label htmlFor="MolecularWeight">Molecular Weight</label>
              <input type="text" id="MolecularWeight" name="MolecularWeight" value = {formData.MolecularWeight} onChange={handleChange} />
            </div>
            
            {/* 7th Line: Synonyms */}
            <div className="form-group">
              <label htmlFor="synonyms">Synonyms</label>
              <input type="text" id="synonyms" name="synonyms" value = {formData.synonyms}  onChange={handleChange}/>
            </div>
            
            {/* 8th Line: Chemical Industries */}
            <div className="form-group">
              <label htmlFor="chemical-industries">Chemical Industries</label>
              <select id="chemical-industries" name="chemical-industries" value = {formData.chemicalIndustries} onChange={handleChange}>
                <option value="industry1">Industry 1</option>
                <option value="industry2">Industry 2</option>
              </select>
            </div>
          </div>
          
          {/* Image Container (40%) */}
          <div className="form-right">
            <label>Upload Image</label>
            <div className="image-upload-container">
              <input type="file" id="chemical-image" name="chemical-image" accept="image/*" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} />
              <img src="image_placeholder.png" alt="Uploaded" />
              <button type="button" className="image-upload-button">
                <i className="fa fa-upload"></i> Add Image
              </button>
            </div>
          </div>
        </div>

        {/* Save and Cancel Buttons */}
        <div className="form-buttons">
          <button type="submit" className="save-button">
            <i className="fa fa-save"></i> Save
          </button>
          <button type="button" className="cancel-button">
            <i className="fa fa-times"></i> Cancel
          </button>
        </div>
      </form>

      <footer>
        <p>Copyright © 2014-2021 Chemical CRM All rights reserved.</p>
        <p>Version 1.0.0</p>
      </footer>
    </div>
    </div>
  );
};

export default ChemicalAddNew;
