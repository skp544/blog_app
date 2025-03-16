const cloudinary = require("cloudinary").v2;

const connectCloudinary = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    console.log("Successfully connected cloudinary...");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

module.exports = connectCloudinary;
