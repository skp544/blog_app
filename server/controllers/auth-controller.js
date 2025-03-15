const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user-model"); // Adjust based on your project structure
const { errorResponse } = require("../lib/helper");

const JWT_SECRET = process.env.JWT_SECRET; // Use env variable

/**
 * @body {String} username - The username of the user
 * @body {String} email - The email of the user
 * @body {String} password - The password of the user
 * @returns {Object} - The user object and JWT token
 */
exports.signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return errorResponse({
        res,
        message: "Please fill in all fields",
        status: 400,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse({
        res,
        message: "User already exists",
        status: 400,
      });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return errorResponse({
        res,
        message: "Username already exists",
        status: 400,
      });
    }

    if (password.length < 6) {
      return errorResponse({
        res,
        message: "Password should be at least 6 characters",
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully!",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (e) {
    return errorResponse({ res, message: e.message });
  }
};

/**
 * User Sign In
 * @body {String} email - The email of the user
 * @body {String} password - The password of the user
 * @returns {Object} - The user object and JWT token
 */
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse({
        res,
        message: "Please provide email and password",
        status: 400,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return errorResponse({
        res,
        message: "Invalid credentials",
        status: 401,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse({
        res,
        message: "Invalid credentials",
        status: 401,
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (e) {
    return errorResponse({ res, message: e.message });
  }
};
