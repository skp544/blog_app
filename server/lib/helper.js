const cloudinary = require("cloudinary").v2;

exports.errorResponse = ({
  status = 500,
  message = "Internal Server Error",
  res,
}) => {
  return res.status(status).json({ success: false, message });
};

exports.userFormatter = (user) => {
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
    photoUrl: user.photoUrl,
  };
};

exports.uploadImageToCloudinary = async ({
  file,
  height = 400,
  quality = 400,
}) => {
  try {
    const options = { folder: "blog_app" };

    if (height) {
      options.height = height;
    }
    if (quality) {
      options.quality = quality;
    }

    options.resource_type = "auto";

    const result = await cloudinary.uploader.upload(file.tempFilePath, options);

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};
