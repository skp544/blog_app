const { errorResponse } = require("../lib/helper");
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

/*
 *  @desc: Middleware to check if user is authenticated
 */

exports.isAuth = async (req, res, next) => {
  try {
    console.log("isAuth middleware");
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return errorResponse({ res, status: 401, message: "Token is missing!" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user) {
        return errorResponse({ res, status: 404, message: "User not found!" });
      }

      console.log("Authenticated User:", user);

      req.user = {
        id: user._id.toString(), // Convert ObjectId to string for consistency
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
      };

      console.log("User:", req.user);

      next();
    } catch (error) {
      console.log("err", error);
      return errorResponse({ res, message: "Invalid token", status: 401 });
    }
  } catch (error) {
    console.log("Error in isAuth middleware", error);
    return errorResponse({
      res,
      message: error.message || "Failed to authenticate!",
      status: 500,
    });
  }
};

/*
 *  @desc: Middleware to check if user is admin
 */

exports.isAdmin = async (req, res, next) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      return errorResponse({ res, message: "Unauthorized", status: 403 });
    }

    next();
  } catch (error) {
    console.log("Error in isAdmin middleware", error);
    return errorResponse({
      res,
      message: error.message || "Failed to authenticate!",
      status: 500,
    });
  }
};
