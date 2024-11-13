import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Dashboard from './Component/Dashboard';
import Chemical from './Component/Chemical';
import Supplier from './Component/Supplier';
import Customer from './Component/Customer';

import ChemicalList from './Component/ChemicalList';
import ChemicalAddNew from './Component/ChemicalAddNew';
// import ChemicalPreview from './Component/ChemicalPreview';
// import ChemicalTypes from './Component/ChemicalTypes';

import Navbar from './Navbar';

import SupplierAddNew from './Component/Supplier/SupplierAddNew';
import SupplierList from './Component/Supplier/SupplierList';

import CustomerList from './Component/Customer/CustomerList';
import CustomerAddNew from './Component/Customer/CustomerAddNew';
// import CChemicalMapping from './Component/Customer/CChemicalMapping';

import InquiryList from './Component/Inquiry/InquiryList';
import InquiryAddNew from './Component/Inquiry/InquiryAddNew';
// import InquiryStatus from './Component/Inquiry/InquiryStatus';
// import InquirySource from './Component/Inquiry/InquirySource';

import Expense from './Component/Expense/Expense';
import ExpenseAddNew from './Component/Expense/ExpenseAddNew';
import ExpenseCategory from './Component/Expense/ExpenseCategory';
import Login from './Component/User/Login';
import Signup from './Component/User/Signup';

import { UserProvider } from '../src/Component/UserContext';
import Image from './Component/Image';
import Imagesseen from './Component/Imagesseen';
import ForgotPassword from './Component/User/Forget';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <UserProvider>
      <div>
        {/* Only render Navbar if not on the login/signup page */}
        {location.pathname !== '/' && location.pathname !== '/Signup' && (
          <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        )}
        <div className={`main-content ${isOpen ? 'shifted' : ''}`}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/chemical" element={<Chemical />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/supplier" element={<Supplier />} />
            <Route path="/chemical/List" element={<ChemicalList />} />
            <Route path="/chemical/Add New" element={<ChemicalAddNew />} />
            {/* <Route path="/chemical/Preview" element={<ChemicalPreview />} />
            <Route path="/chemical/ChemicalTypes" element={<ChemicalTypes />} /> */}
            <Route path="/supplier/AddNew" element={<SupplierAddNew />} />
            <Route path="/supplier/List" element={<SupplierList />} />
            <Route path="/Customer/CustomerList" element={<CustomerList />} />
            <Route path="/Customer/CustomerAddNew" element={<CustomerAddNew />} />
            {/* <Route path="/Customer/CChemicalMapping" element={<CChemicalMapping />} /> */}
            <Route path="/Inquiry/InquiryList" element={<InquiryList />} />
            <Route path="/Inquiry/InquiryAddNew" element={<InquiryAddNew />} />
            {/* <Route path="/Inquiry/InquiryStatus" element={<InquiryStatus />} />
            <Route path="/Inquiry/InquirySource" element={<InquirySource />} /> */}
            <Route path="/Expense/Expense" element={<Expense />} />
            <Route path="/Expense/ExpenseAddNew" element={<ExpenseAddNew />} />
            <Route path="/Expense/ExpenseCategory" element={<ExpenseCategory />} />
            <Route path="/Image" element={<Image />} />
            <Route path="/Imagesseen" element={<Imagesseen />} />
            <Route path = "/ForgotPassword" element = {<ForgotPassword />} />
          </Routes>
        </div>
      </div>
    </UserProvider>
  );
}

function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;
