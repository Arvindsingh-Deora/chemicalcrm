import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Style/Dashboard.css';

import CustomerList from '../Component/Customer/CustomerList';
import Expense from '../Component/Expense/Expense';
import MyCalendar from  '../Component/Calender';

const Dashboard = () => {
  const [inquiryCount, setInquiryCount] = useState(0);
  const [chemicalCount, setChemicalCount] = useState(0);
  const [supplierCount, setSupplierCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Your existing axios calls
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    // Fetch total inquiries
    axios.get('http://localhost:5000/api/inquiries/count')
      .then(response => {
        setInquiryCount(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching inquiry count:', error);
      });

    // Fetch total chemicals
    axios.get('http://localhost:5000/api/chemicals/count')
      .then(response => {
        setChemicalCount(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching chemical count:', error);
      });

    // Fetch total suppliers
    axios.get('http://localhost:5000/api/suppliers/count')
      .then(response => {
        setSupplierCount(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching supplier count:', error);
      });

    // Fetch total customers
    axios.get('http://localhost:5000/customers/count')
      .then(response => {
        setCustomerCount(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching customer count:', error);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <div className="card">
        <h2>Total Inquiries</h2>
        <p>{inquiryCount}</p>
      </div>
      <div className="card">
        <h2>Total Chemicals</h2>
        <p>{chemicalCount}</p>
      </div>
      <div className="card">
        <h2>Total Suppliers</h2>
        <p>{supplierCount}</p>
      </div>
      <div className="card">
        <h2>Total Customers</h2>
        <p>{customerCount}</p>
      </div>

      {/* Horizontal line after the cards */}
      <hr />

      {/* Render the InquiryList component */}
      <CustomerList />
      <div className="full-width">
        <Expense />
      </div>
      {/* <div className="calendar-container">
        <MyCalendar />
      </div> */}

<div className="full-width calendar-container">
        <MyCalendar />
      </div>
      
    </div>
  );
};

export default Dashboard;
