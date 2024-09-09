const mongoose = require('mongoose');

// Define the user schema with email and hashed password
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Export the model
module.exports = mongoose.model('User', userSchema);