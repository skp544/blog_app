require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const userRoutes = require("./routes/user-routes");
const authRoutes = require("./routes/auth-routes");
const cors = require("cors");
const connectCloudinary = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const postRoutes = require("./routes/post-route");
const commentRoutes = require("./routes/comment-route");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  }),
);

const PORT = process.env.PORT || 3000;

connectDB();
connectCloudinary();

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
