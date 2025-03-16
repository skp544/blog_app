const {
  errorResponse,
  uploadImageToCloudinary,
  userFormatter,
} = require("../lib/helper");
const User = require("../models/user-model");
const bcrypt = require("bcrypt");

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
