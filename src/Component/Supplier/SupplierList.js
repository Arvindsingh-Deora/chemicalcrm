import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react'; // Import AG Grid
import axios from 'axios'; // Import axios for API requests
import 'ag-grid-community/styles/ag-grid.css'; // AG Grid CSS
import 'ag-grid-community/styles/ag-theme-alpine.css'; // AG Grid Theme

const SupplierList = () => {
  const [rowData, setRowData] = useState([]); // State to store the supplier data

  // Fetch supplier data from backend API on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/suppliers') // Correct API endpoint for suppliers
      .then(response => {
        setRowData(response.data); // Set the data in rowData
      })
      .catch(error => {
        console.error('Error fetching suppliers:', error);
      });
  }, []);

  // Define column headers for AG Grid
  const columnDefs = [
    { headerName: 'Supplier Name', field: 'supplierName' },
    { headerName: 'Contact Person', field: 'contactPerson' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Website', field: 'website' },
    { headerName: 'Mobile Number', field: 'mobileNumber' },
    { headerName: 'Phone Number', field: 'phoneNumber' },
    { headerName: 'Country', field: 'country' },
    { headerName: 'City', field: 'city' },
    { headerName: 'Description', field: 'description' },
   
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: '400px', width: '80%', marginTop: '120px', marginBottom: '120px', marginLeft: '250px' }}>
      <AgGridReact
        rowData={rowData} // Provide the row data to AG Grid
        columnDefs={columnDefs} // Provide the column definitions
        defaultColDef={{ flex: 1, sortable: true, filter: true }} // Enable sorting and filtering
      />
    </div>
  );
};

export default SupplierList
