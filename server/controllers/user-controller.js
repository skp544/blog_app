const {
  errorResponse,
  uploadImageToCloudinary,
  userFormatter,
} = require("../lib/helper");
const User = require("../models/user-model");
const bcrypt = require("bcrypt");

/**
 * @desc Update user profile
 * @body {String} username - The username of the user
 * @body {String} email - The email of the user
 * @body {String} password - The password of the user
 * @body {File} profilePhoto - The profile photo of the user
 * @returns {Object} - The updated user object
 */

exports.userUpdate = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const profilePhoto = req.files.profilePhoto;
    let profileUrl = "";

    if (profilePhoto) {
      profileUrl = await uploadImageToCloudinary({
        file: profilePhoto,
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return errorResponse({ res, message: "User not found", status: 404 });
    }

    user.username = username || user.username;
    user.email = email || user.email;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    if (profileUrl || profileUrl === "") {
      user.photoUrl = profileUrl;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User updated successfully!",
      user: userFormatter(user),
    });
  } catch (e) {
    return errorResponse({ res, message: e.message });
  }
};

/**
 * @desc Delete user
 */
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return errorResponse({ res, message: "User not found", status: 404 });
    }

    await user.deleteOne();

    return res.status(200).json({
      success: true,
      message: "User deleted successfully!",
    });
  } catch (e) {
    return errorResponse({ res, message: e.message });
  }
};
