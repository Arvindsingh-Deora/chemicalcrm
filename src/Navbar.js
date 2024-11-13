import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import './Navbar.css';
import { UserContext } from '../src/Component/UserContext';

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdowns, setDropdowns] = useState({
    chemical: false,
    supplier: false,
    customer: false,
    inquiry: false,
    expense: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) setUser(userData);
  }, []); // Dependency array added

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Clear user data from local storage on logout
    navigate('/');
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  const toggleDropdown = (name) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  return (
    <>
      <header className="horizontal-navbar">
        <img src="https://chemical.mlglobtech.com/assets/images/logo.png" alt="Logo" className="logo" />
        <div className="menu-icon" onClick={toggleSidebar}  style={{
    position: 'absolute',
    right: '150px',
    top: '0',
    padding: '10px',
    cursor: 'pointer'
  }}>
          <i className="ri-menu-line"></i>
        </div>

        {/* Display user name in the navbar */}
        {user && (
          <div className="user-info">
            {user.firstName} {user.lastName}
          </div>
        )}
        <button id="logout" onClick={handleLogout}>Logout</button>
      </header>

      {/* Sidebar */}
      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <Link to="/Dashboard" onClick={toggleSidebar}><i className="ri-dashboard-3-fill"></i> Dashboard</Link>
          </li>
         
          <li>
            <div onClick={() => toggleDropdown('supplier')} className="dropdown-toggle">
              <i className="ri-truck-line"></i> Supplier
            </div>
            {dropdowns.supplier && (
              <ul className="dropdown-menu">
                <li><Link to="/supplier/List" onClick={toggleSidebar}><i className="ri-file-list-line"></i>List</Link></li>
                <li><Link to="/supplier/AddNew" onClick={toggleSidebar}><i className="ri-add-large-fill"></i>Add New</Link></li>
                {/* <li><Link to="/supplier/ChemicalMapping" onClick={toggleSidebar}>Chemical Mapping</Link></li>
                <li><Link to="/supplier/SearchMapping" onClick={toggleSidebar}>Search Mapping</Link></li> */}
              </ul>
            )}
          </li>
          <li>
            <div onClick={() => toggleDropdown('customer')} className="dropdown-toggle">
              <i className="ri-user-search-fill"></i> Customer
            </div>
            {dropdowns.customer && (
              <ul className="dropdown-menu">
                <li><Link to="/Customer/CustomerList" onClick={toggleSidebar}><i className="ri-file-list-line"></i>List</Link></li>
                <li><Link to="/Customer/CustomerAddNew" onClick={toggleSidebar}><i className="ri-add-large-fill"></i>Add New</Link></li>
                {/* <li><Link to="/Customer/CChemicalMapping" onClick={toggleSidebar}>Chemical Mapping</Link></li> */}
              </ul>
            )}
          </li>
          <li>
            <div onClick={() => toggleDropdown('inquiry')} className="dropdown-toggle">
              <i className="ri-question-line"></i> Inquiry
            </div>
            {dropdowns.inquiry && (
              <ul className="dropdown-menu">
                <li><Link to="/Inquiry/InquiryList" onClick={toggleSidebar}><i className="ri-file-list-line"></i>List</Link></li>
                <li><Link to="/Inquiry/InquiryAddNew" onClick={toggleSidebar}><i className="ri-add-large-fill"></i>Add New</Link></li>
                {/* <li><Link to="/Inquiry/InquiryStatus" onClick={toggleSidebar}>Status</Link></li>
                <li><Link to="/Inquiry/InquirySource" onClick={toggleSidebar}>Source</Link></li> */}
              </ul>
            )}
          </li>
          <li>
            <div onClick={() => toggleDropdown('expense')} className="dropdown-toggle">
              <i className="ri-wallet-line"></i> Expense
            </div>
            {dropdowns.expense && (
              <ul className="dropdown-menu">
                <li><Link to="/Expense/Expense" onClick={toggleSidebar}><i className="ri-file-list-line"></i>List</Link></li>
                <li><Link to="/Expense/ExpenseAddnew" onClick={toggleSidebar}><i className="ri-add-large-fill"></i>Add New</Link></li>
                <li><Link to="/Expense/ExpenseCategory" onClick={toggleSidebar}>Expense Category</Link></li>
              </ul>
            )}
          </li>
          <li>
            <div onClick={() => toggleDropdown('chemical')} className="dropdown-toggle">
              <i className="ri-reactjs-line"></i> Chemical <i className="ri-arrow-down-double-fill"></i>
            </div>
            {dropdowns.chemical && (
              <ul className="dropdown-menu">
                <li><Link to="/chemical/List" onClick={toggleSidebar}><i className="ri-file-list-line"></i>List</Link></li>
                <li><Link to="/chemical/Add New" onClick={toggleSidebar}><i className="ri-add-large-fill"></i>Add New</Link></li>
                {/* <li><Link to="/chemical/Chemical types" onClick={toggleSidebar}>Chemical Types</Link></li>
                <li><Link to="/chemical/Search Supplier" onClick={toggleSidebar}>Search Supplier</Link></li>
                <li><Link to="/chemical/Unit" onClick={toggleSidebar}>Unit</Link></li> */}
              </ul>
            )}
          </li>
        </ul>
      </nav>

      <div className={`main-content ${isOpen ? 'shifted' : ''}`}>
        {/* Main content goes here */}
      </div>
    </>
  );
};

export default Navbar;
