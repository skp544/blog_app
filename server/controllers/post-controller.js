const { errorResponse, uploadImageToCloudinary } = require("../lib/helper");
const Post = require("../models/post-model");

/*
 * @desc Create a new post
 * @body {String} title - The title of the post
 * @body {String} content - The content of the post
 * @body {String} category - The category of the post
 * @body {File} postImage - The image of the post
 * @returns {Object} - The created post object
 * @access Private
 */

exports.create = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const postImage = req.files?.postImage; // Safe check

    if (!title || !content || !category) {
      return errorResponse({
        res,
        message: "Please fill all fields",
        status: 400,
      });
    }

    let postImageUrl = "";

    if (postImage) {
      postImageUrl = await uploadImageToCloudinary({
        file: postImage,
      });
    }

    const post = await Post.create({
      title,
      content,
      category,
      postImage: postImageUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (e) {
    console.error(e);
    return errorResponse({ res, message: e.message, status: 500 });
  }
};

/*
 * @desc Update a post
 * @param {String} id - The id of the post
 * @body {String} title - The title of the post
 * @body {String} content - The content of the post
 * @body {String} category - The category of the post
 * @body {File} postImage - The image of the post
 * @returns {Object} - The updated post object
 * @access Private
 */

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category } = req.body;
    const postImage = req.files?.postImage; // Safe check

    // Check if post exists
    const existingPost = await Post.findById(id);
    if (!existingPost) {
      return errorResponse({ res, message: "Post not found", status: 404 });
    }

    let postImageUrl = existingPost.postImage; // Keep existing image if no new image is uploaded

    if (postImage) {
      postImageUrl = await uploadImageToCloudinary({
        file: postImage,
      });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content, category, postImage: postImageUrl },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (e) {
    return errorResponse({ res, message: e.message, status: 500 });
  }
};

/*
 * @desc Get all posts
 * @returns {Array} - An array of post objects
 * @access Public
 */

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (e) {
    return errorResponse({ res, message: e.message, status: 500 });
  }
};

/*
 * @desc Get a single post
 * @param {String} id - The id of the post
 * @returns {Object} - The post object
 * @access Public
 */

exports.getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return errorResponse({ res, message: "Post not found", status: 404 });
    }

    return res.status(200).json({
      success: true,
      post,
    });
  } catch (e) {
    return errorResponse({ res, message: e.message, status: 500 });
  }
};

/*
 * @desc Delete a post
 * @param {String} id - The id of the post
 * @access Private
 */

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return errorResponse({ res, message: "Post not found", status: 404 });
    }

    await post.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (e) {
    return errorResponse({ res, message: e.message, status: 500 });
  }
};
