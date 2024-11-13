// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Chemical = require('./Model/chemicalPreview');
const Supplier = require('./Model/Supplier/Supplier');
const Expense = require('./Model/Expense/ExpenseAddNew');
const Category = require('./Model/Expense/Category');

const Customer = require('./Model/Customer/AddNew');
const Inquiry = require('./Model/Inquiry/Addnew');

const authRoutes = require('./Routes/Auth');


const multer = require('multer');
const Image = require('./Model/Image');

// Create the app
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api/auth', authRoutes);


// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/chemicals', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

mongoose.connect('mongodb://localhost:27017/chemicals')
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

  const storage = multer.memoryStorage(); // Store image in memory
const upload = multer({ storage: storage });


app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Create a new Image document
    const newImage = new Image({
      name: req.file.originalname,
      img: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    const savedImage = await newImage.save(); // Save the image to MongoDB
    res.status(201).json({ message: 'Image uploaded successfully!', imageId: savedImage._id });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Failed to upload image', error });
  }
});


// Assuming you have an 'Image' model in Mongoose
app.get('/upload', async (req, res) => {
  try {
    const images = await Image.find(); // Adjust the query if you only need specific fields
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Error fetching images' });
  }
});


// Retrieve an image from MongoDB by ID
// app.get('/image/:id', async (req, res) => {
//   try {
//     const image = await Image.findById(req.params.id);
//     if (!image) {
//       return res.status(404).json({ message: 'Image not found' });
//     }
//     res.contentType(image.img.contentType);
//     res.send(image.img.data);
//   } catch (error) {
//     console.error('Error fetching image:', error);
//     res.status(500).json({ message: 'Error fetching image', error });
//   }
// });

app.get('/images', async (req, res) => {
  try {
      const images = await Image.find({}, { img: 0 }); // Exclude image data for the list
      res.json(images);
  } catch (error) {
      console.error('Error fetching images:', error);
      res.status(500).json({ message: 'Error fetching images', error });
  }
});

// Endpoint to retrieve a specific image by ID
app.get('/image/:id', async (req, res) => {
  try {
      const image = await Image.findById(req.params.id);
      if (!image) {
          return res.status(404).json({ message: 'Image not found' });
      }
      res.contentType(image.img.contentType);
      res.send(image.img.data);
  } catch (error) {
      console.error('Error fetching image:', error);
      res.status(500).json({ message: 'Error fetching image', error });
  }
});



  // POST route to add a new chemical
app.post('/api/chemicals', async (req, res) => {
  try {
    const newChemical = new Chemical(req.body);
    await newChemical.save();
    res.status(201).json({ message: 'Chemical added successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding chemical', error });
  }
});

// API endpoint to handle form data submission


// API endpoint to get all chemicals
app.get('/api/chemicals', async (req, res) => {
    try {
      const chemicals = await Chemical.find(); // Fetch all chemicals from MongoDB
      res.status(200).json(chemicals);         // Send them as a JSON response
    } catch (error) {
      console.error('Error fetching chemical data:', error);
      res.status(500).send('Error fetching chemical data.');
    }
  });
  

  // API endpoint to get the count of chemicals
app.get('/api/chemicals/count', async (req, res) => {
    try {
      const count = await Chemical.countDocuments(); // Get the count of documents
      res.status(200).json({ count });               // Send the count as a JSON response
    } catch (error) {
      console.error('Error fetching chemical count:', error);
      res.status(500).send('Error fetching chemical count.');
    }
  });





  //Supplier


  

 // POST endpoint to add a new supplier
app.post('/api/suppliers', async (req, res) => {
  try {
    const supplierData = req.body; // Get the form data from the request body

    const newSupplier = new Supplier({
      supplierName: supplierData.supplierName,
      contactPerson: supplierData.contactPerson,
      email: supplierData.email,
      website: supplierData.website,
      mobileNumber: supplierData.mobileNumber,
      phoneNumber: supplierData.phoneNumber,
      address: supplierData.address,
      country: supplierData.country,
      city: supplierData.city,
      description: supplierData.description,
    });

    await newSupplier.save();  // Save supplier data to MongoDB
    res.status(200).send('Supplier data saved successfully.');
  } catch (error) {
    console.error('Error saving supplier data:', error);
    res.status(500).send('Error saving supplier data.');
  }
});



  app.get('/api/suppliers/count', async (req, res) => {
    try {
      const count = await Supplier.countDocuments(); // Get the count of supplier documents
      res.json({ count }); // Send the count as a JSON response
    } catch (error) {
      console.error('Error fetching supplier count:', error);
      res.status(500).send('Error fetching supplier count.');
    }
  });


  app.get('/api/suppliers', async (req, res) => {
    try {
      const suppliers = await Supplier.find().sort({ createdAt: -1 }); // Sort by 'supplierName' in descending order
      res.status(200).json(suppliers); // Return the sorted suppliers as JSON
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      res.status(500).send('Error fetching supplier data.');
    }
  });


  //Expense

  app.post('/add', async (req, res) => {
    try {
      const expense = new Expense(req.body);
      await expense.save();
      res.status(201).json({ message: 'Expense saved successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error saving expense', error });
    }
  });
  

  // In server.js or your routes file
app.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({date:-1}); // Retrieve all expenses
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expenses', error });
  }
});


// In server.js or your routes file

// Update (edit) expense
app.put('/expense/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: 'Expense updated successfully', data: updatedExpense });
  } catch (error) {
    res.status(400).json({ message: 'Error updating expense', error });
  }
});

// Delete expense
app.delete('/expense/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.findByIdAndDelete(id);
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting expense', error });
  }
});




app.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error fetching categories', error });
  }
});

// Add a new category
app.post('/categories', async (req, res) => {
  try {
    const newCategory = new Category({ name: req.body.name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ message: 'Error adding category', error });
  }
});

// Update a category
app.put('/categories/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Error updating category', error });
  }
});

// Delete a category
app.delete('/categories/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Category deleted' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Error deleting category', error });
  }
});



app.get('/api/expenses/count', async (req, res) => {
  try {
    const count = await Expense.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error fetching expense count:', error);
    res.status(500).json({ error: 'Error fetching expense count' });
  }
});


//customer 

// Corrected customer POST route
app.post('/customers', async (req, res) => {  // Add missing '/' in the route path
  try {
    const customer = new Customer(req.body);  // Ensure correct capitalization for Customer model
    await customer.save();
    res.status(201).send({ message: 'Customer added successfully' });
  } catch (error) {
    console.error('Error adding customer:', error);  // Add a console log for debugging
    res.status(500).send({ message: 'Failed to add customer', error });
  }
});

app.get('/customers', async (req, res) => {
  try {
    const customers = await Customer.find();  // Replace 'Customer' with your model
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers" });
  }
});


app.put('/customers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const customer = await Customer.findByIdAndUpdate(id, updatedData, { new: true });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json({ message: 'Customer updated successfully', customer });
  } catch (error) {
    res.status(500).json({ message: 'Error updating customer', error });
  }
});

app.delete('/customers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByIdAndDelete(id);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting customer', error });
  }
});



app.get('/customers/count' , async (req , res)=>{
   try{
     const count = await Customer.countDocuments();
     res.json({count})
   } catch(error){
    console.error('Error fetching count' , error);
    res.status(500).json({error:'Error count'});
   }
})

//inquiry

app.post('/api/inquiries', async (req, res) => {
  const newInquiry = new Inquiry(req.body);

  try {
    const savedInquiry = await newInquiry.save();
    res.status(201).json(savedInquiry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/inquiries', async (req, res) => {
  try {
    // Fetch all inquiries from the database
    const inquiries = await Inquiry.find();
    res.status(200).json(inquiries); // Send the data as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inquiries', error });
  }
});


app.get('/api/inquiries/count', async (req, res) => {
  try {
    const count = await Inquiry.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching inquiry count:', error);
    res.status(500).json({ error: 'Failed to fetch inquiry count' });
  }
});




  
// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
