const { errorResponse } = require("../lib/helper");
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

exports.isAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return errorResponse({ status: 404, message: "Token is missing!" });
    }

    // verify token
    try {
      const decode = await jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findOne({ _id: decode.id });

      if (!user) {
        return errorResponse({ status: 404, message: "User not found!" });
      }

      req.user = {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      };

      next();
    } catch (error) {
      return errorResponse({ res, message: "Invalid token", status: 401 });
    }
  } catch (error) {
    console.log("Error in is Auth middleware");
    console.log(error);
    return errorResponse({
      res,
      message: error.message || "Failed to authenticate!",
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return errorResponse({ res, message: "Unauthorized", status: 401 });
    }

    next();
  } catch (error) {
    return errorResponse({
      res,
      message: error.message || "Failed to authenticate!",
    });
  }
};
