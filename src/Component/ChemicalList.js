import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react'; // Import AG Grid
import axios from 'axios';                  // Import axios for API requests
import 'ag-grid-community/styles/ag-grid.css';  // AG Grid CSS
import 'ag-grid-community/styles/ag-theme-alpine.css'; // AG Grid Theme

const ChemicalList = () => {
  const [rowData, setRowData] = useState([]);  // State to store the chemical data

  // Fetch chemical data from backend API on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/chemicals')
      .then(response => {
        setRowData(response.data);   // Set the data in rowData
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

 // Define column headers for AG Grid
const columnDefs = [
  { headerName: 'Chemical Name', field: 'name' },
  { headerName: 'Unit', field: 'unit' },
  { headerName: 'Chemical Type', field: 'chemicalType' },
  { headerName: 'CAS Number', field: 'casNumber' },
  { headerName: 'H Bond Acceptor', field: 'hBondAcceptor' },
  { headerName: 'H Bond Donor', field: 'hBondDonor' },
  { headerName: 'IUPAC Name', field: 'iupacName' },
  { headerName: 'InChI Key', field: 'inchlKey' },
  { headerName: 'Molecular Weight', field: 'molecularWeight' },
  { headerName: 'Synonyms', field: 'synonyms' },
  { headerName: 'Industries', field: 'chemicalIndustries' },
  { headerName: 'Image', field: 'image' },
  {
    headerName: 'Actions',
    field: 'actions',
    cellRendererFramework: (params) => <ActionMenu params={params} />
  }
];


  return (
    <div className="ag-theme-alpine-dark" style={{  height: 600,
      width: '80%',
      padding: '50px',
      marginLeft: '250px',   }}>
      <AgGridReact
        rowData={rowData}        // Provide the row data to AG Grid
        columnDefs={columnDefs}  // Provide the column definitions
        defaultColDef={{ flex: 0, sortable: true, filter: true }} // Enable sorting and filtering
      />
    </div>
  );
};

// Custom component for the action menu (three-dot menu)
const ActionMenu = ({ params }) => {
  const handleEdit = () => {
    console.log('Edit row:', params.data);
    // Handle your edit logic here
  };

  const handleDelete = () => {
    console.log('Delete row:', params.data);
    // Handle your delete logic here
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        className="action-menu-button"
        onClick={() => {
          const dropdown = document.getElementById(`dropdown-${params.node.id}`);
          dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
          console.log(`Dropdown for row ${params.node.id} clicked.`); // Debugging log
        }}
      >
        &#x22EE; {/* Unicode for vertical ellipsis (three dots) */}
      </button>

      <div id={`dropdown-${params.node.id}`} className="dropdown-content" style={{ display: 'none', position: 'absolute' }}>
        <div onClick={handleEdit}>Edit</div>
        <div onClick={handleDelete}>Delete</div>
      </div>

      {/* Inline styles for the dropdown menu */}
      <style>
        {`
          .action-menu-button {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 18px;
            color: black; /* Change to a visible color */
          }

          .dropdown-content {
            background-color: white;
            border: 1px solid #ccc;
            padding: 5px;
            z-index: 10; /* Ensure it's above other elements */
            width: 80px;
            display: none; /* Default to hidden */
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15); /* Optional shadow for better visibility */
          }

          .dropdown-content div {
            padding: 5px 10px;
            cursor: pointer;
            background-color: #f1f1f1;
          }

          .dropdown-content div:hover {
            background-color: #ddd;
          }
        `}
      </style>
    </div>
  );
};

export default ChemicalList;
