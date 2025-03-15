const { errorResponse } = require("../lib/helper");
const User = require("../models/user-model");
const bcrypt = require("bcrypt");

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

    return res.status(200).json({
      success: true,
      message: "User created successfully!",
    });
  } catch (e) {
    return errorResponse({ res, message: e.message });
  }
};
