const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose.connect('mongodb://localhost/rapido-clone', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Simple user schema for the app
const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/register', async (req, res) => {
  const { name, phone, email } = req.body;
  const newUser = new User({ name, phone, email });

  try {
    await newUser.save();
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to register user' });
  }
});

// Basic ride booking endpoint
app.post('/book-ride', async (req, res) => {
  const { userId, startLocation, endLocation } = req.body;
  // Normally here we would interact with a driver database to match a driver
  res.json({ message: 'Ride booked successfully', startLocation, endLocation });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
