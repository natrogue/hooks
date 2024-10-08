const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/userModel');  // Import the user model

const uri = 'mongodb://localhost:27017/crmDummy';  // MongoDB connection string

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Function to register a new user
async function registerUser(email, password, role = 'user') {
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists!');
            return;
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);  // 10 is the salt rounds

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
            role
        });

        // Save the user to the database
        await newUser.save();
        console.log('User registered successfully:', newUser);
    } catch (error) {
        console.error('Error registering user:', error.message);
    } finally {
        // Close the connection after the operation
        mongoose.connection.close();
    }
}

// Usage: call the function with the user's email and password
const email = 'nik@example.com';  // Replace with actual email
const password = 'nikolee';   // Replace with actual password
const role = 'admin';              // Replace with 'user' or 'admin'

registerUser(email, password, role);