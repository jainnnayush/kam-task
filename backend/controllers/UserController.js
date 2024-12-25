const User = require('../models/User.js');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
    const { username, email, password, role } = req.body;
  
    if (!username || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields (username, email, password, role) are required",
      });
    }
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }
  
      // Hash the password for security
      const hashPassword = await bcrypt.hash(password, 10);
  
      // Create the new user
      const newUser = new User({
        username,
        email,
        role: role || 'KAM', // Default to 'KAM' if no role is provided
        password: hashPassword,
      });
  
      await newUser.save();
  
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        user: newUser,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Error creating user",
      });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({
        success: true,
        users,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error fetching users",
      });
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      res.status(200).json({
        success: true,
        user,
      });
      console.log(`user returned with id:${id}`);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error fetching user",
      });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error deleting user",
      });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;  // Get user ID from params
    const { username, email, role, password } = req.body;  // Get user data from request body
  
    // Validate incoming data to ensure required fields are present
    if (!username && !email && !role && !password) {
      return res.status(400).json({
        success: false,
        message: "At least one field (username, email, role, or password) is required to update the user."
      });
    }
  
    // Prepare the update data object
    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    if (password) {
      try {
        // Hash the new password if provided
        const hashedPassword = await bcrypt.hash(password, 10);
        updateData.password_hash = hashedPassword;
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: "Error hashing the password. Please try again later."
        });
      }
    }
  
    try {
      // Find the user by ID and update their details
      const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  
      if (!updatedUser) {
        // If no user is found with the given ID
        return res.status(404).json({
          success: false,
          message: "User not found. Unable to update user."
        });
      }
  
      // Return success response with updated user data
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        user: updatedUser
      });
    } catch (error) {
      // Handle database-related errors (e.g., validation errors, MongoDB errors)
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error updating user. Please try again later."
      });
    }
};