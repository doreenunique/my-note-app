// models/user.js

// Import the database connection and mongoose
const db = require("../connection");
const mongoose = require("mongoose");

// Define the User schema using Mongoose
const UserSchema = mongoose.Schema({
  email: String,
  password: String,
});

// Create the User model using the defined schema
const User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;
