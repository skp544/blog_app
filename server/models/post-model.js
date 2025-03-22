const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    content: {
      type: String,
      required: true,
    },
    postImage: {
      type: String,
      default:
        "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const Post = model("Post", postSchema);
module.exports = Post;
