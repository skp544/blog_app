const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const { errorResponse, userFormatter } = require("../lib/helper");

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * @desc User Sign Up
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
        message: "User already exists! Please sign in!",
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
      user: userFormatter(user),
    });
  } catch (e) {
    return errorResponse({ res, message: e.message });
  }
};

/**
 * @desc User Sign In
 * @body {String} email - The email of the user
 * @body {String} password - The password of the user
 * @returns {Object} - The user object and JWT token
 */
exports.signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return errorResponse({
        res,
        message: "Please provide email and password",
        status: 400,
      });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return errorResponse({
        res,
        message: "User not exists! Please sign up",
        status: 401,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse({
        res,
        message: "Invalid Password",
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
      user: userFormatter(user),
    });
  } catch (e) {
    return errorResponse({ res, message: e.message });
  }
};

/**
 * @desc Google Auth
 * @body {String} name - The name of the user
 * @body {String} email - The email of the user
 * @body {String} photoUrl - The photoUrl of the user
 * @returns {Object} - The user object and JWT token
 */

exports.googleAuth = async (req, res) => {
  try {
    const { name, email, photoUrl } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.status(200).json({
        success: true,
        message: "Logged in successfully!",
        token,
        user: userFormatter(user),
      });
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);

      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email: email,
        password: hashedPassword,
        photoUrl,
      });

      await newUser.save();

      const token = jwt.sign(
        { id: newUser._id, email: newUser.email },
        JWT_SECRET,
        {
          expiresIn: "7d",
        },
      );

      return res.status(200).json({
        success: true,
        message: "Logged in successfully!",
        token,
        user: userFormatter(newUser),
      });
    }
  } catch (e) {
    return errorResponse({ res, message: e.message });
  }
};
