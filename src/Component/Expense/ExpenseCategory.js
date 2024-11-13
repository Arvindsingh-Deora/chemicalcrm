import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Style/Expense/ExpenseCate.css';

const ExpenseCategory = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch categories from the backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddCategory = async () => {
    try {
      if (editIndex !== null) {
        // Edit existing category
        const response = await axios.put(`http://localhost:5000/categories/${categories[editIndex]._id}`, {
          name: newCategory,
        });
        const updatedCategories = [...categories];
        updatedCategories[editIndex] = response.data;
        setCategories(updatedCategories);
        setEditIndex(null);
      } else {
        // Add new category
        const response = await axios.post('http://localhost:5000/categories', { name: newCategory });
        setCategories([...categories, response.data]);
      }
      setNewCategory('');
      setShowPopup(false);
    } catch (error) {
      console.error('Error adding/editing category:', error);
    }
  };

  const handleEditCategory = (index) => {
    setNewCategory(categories[index].name);
    setEditIndex(index);
    setShowPopup(true);
  };

  const handleDeleteCategory = async (index) => {
    try {
      const categoryId = categories[index]._id;
      await axios.delete(`http://localhost:5000/categories/${categoryId}`);
      const updatedCategories = categories.filter((_, i) => i !== index);
      setCategories(updatedCategories);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // return (
//     <div>
//       <h1>This is the Expense Category page</h1>
//       <button onClick={() => setShowPopup(true)}>Add Expense Category</button>

//       {showPopup && (
//         <div className="popup">
//           <h2>{editIndex !== null ? 'Edit Category' : 'Add Category'}</h2>
//           <input
//             type="text"
//             value={newCategory}
//             onChange={(e) => setNewCategory(e.target.value)}
//             placeholder="Enter category name"
//           />
//           <button onClick={handleAddCategory}>{editIndex !== null ? 'Update' : 'Save'}</button>
//           <button onClick={() => setShowPopup(false)}>Cancel</button>
//         </div>
//       )}

//       <table>
//         <thead>
//           <tr>
//             <th>Category</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {categories.map((category, index) => (
//             <tr key={category._id}>
//               <td>{category.name}</td>
//               <td>
//                 <button onClick={() => handleEditCategory(index)}>Edit</button>
//                 <button onClick={() => handleDeleteCategory(index)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

return (
  <div className="expense-category-container">
    <h1 className="page-title">Expense Categories</h1>
    <button className="add-category-btn" onClick={() => setShowPopup(true)}>
      Add Expense Category
    </button>

    {showPopup && (
      <div className="popup-overlay">
        <div className="popup">
          <h2>{editIndex !== null ? 'Edit Category' : 'Add Category'}</h2>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter category name"
          />
          <div className="popup-buttons">
            <button className="save-btn" onClick={handleAddCategory}>
              {editIndex !== null ? 'Update' : 'Save'}
            </button>
            <button className="cancel-btn" onClick={() => setShowPopup(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}

    <table className="category-table">
      <thead>
        <tr>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category, index) => (
          <tr key={category._id}>
            <td>{category.name}</td>
            <td>
              <div className="action-buttons">
                <button className="edit-btn" onClick={() => handleEditCategory(index)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDeleteCategory(index)}>
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}
export default ExpenseCategory;
