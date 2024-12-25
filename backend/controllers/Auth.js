const User = require('../models/User.js');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
      //Get the data from the request
      //console.log(req.body);
      const { username, email, password ,role} = req.body;
      if (!username || !email || !password ) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
      //Cheak is the user already exists or not
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        //If a valid entry is present in the database then simply return
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }
      //Existing user is need to do the signup for the protection purpose its always a good practice to hash the password
      let hashPassword;
      try {
        hashPassword = await bcrypt.hash(password, 10);
        //10 represent the no of rounds
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error in hashing the password",
        });
      }
      //After hashing the password we need to create the entry in the database
      const user = await User.create({
        username,
        email,
        role,
        password: hashPassword,
      });
      console.log(user);
      return res.status(200).json({
        success: true,
        message: "User Created Success",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "User Cannot be registered please try again later",
      });
    }
};

exports.login = async (req, res) => {
  try {
    //console.log(req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Not a signedin user First Signin then come to the login page",
      });
    }
    // return token with a payload of user's information.
    const isMatch=await bcrypt.compare(password,user.password);
    if (!isMatch) {
        return res.status(403).json({
          success: false,
          message: "Incorrect email id or password",
        });
    }
    const payload = {
      email: user.email,
      name: user.username,
      role:user.role,
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user = user.toObject();
    user.token = token;

    const options = {
      expires: new Date(Date.now() + 3 * 60 * 60 * 24 * 1000),
      httpOnly: true,
    };

    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user,
      message: "User logged in Successfully",
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token").status(200).json({
      success: true,
      message: "User logged out successfully",
  });
};
