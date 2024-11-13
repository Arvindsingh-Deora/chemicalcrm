import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const InquiryList = () => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    // Fetch inquiries data from the backend
    fetch('http://localhost:5000/api/inquiries')
      .then((response) => response.json())
      .then((data) => setRowData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Define column definitions with custom labels
  const columnDefs = [
    { headerName: 'ID', field: '_id' },
    { headerName: 'Inquiry Status', field: 'inquiryStatus' },
    { headerName: 'Assigned To', field: 'assignedTo' },
    { headerName: 'Contact Person', field: 'contactPerson' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Mobile Number', field: 'mobileNumber' },
    { headerName: 'Phone Number', field: 'phone' },
    { headerName: 'Website', field: 'website' },
    { headerName: 'Address', field: 'address' },
    { headerName: 'City', field: 'city' },
    { headerName: 'Country', field: 'country' },
    { headerName: 'Source of Inquiry', field: 'sourceOfInquiry' },
    { headerName: 'Message', field: 'message' },
    { headerName: 'Created At', field: 'createdAt' },
    { headerName: 'Updated At', field: 'updatedAt' },
  ];

  return (
    <div className="ag-theme-alpine-dark" style={{  height: 600,
      width: '80%',
      padding: '50px',
      marginLeft: '250px', }}>
      <h2>Inquiry List</h2>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
};

export default InquiryList;
