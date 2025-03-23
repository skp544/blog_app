const { errorResponse, uploadImageToCloudinary } = require("../lib/helper");
const Post = require("../models/post-model");
const mongoose = require("mongoose");

/**
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

    console.log("Post Image URL:", postImageUrl);

    const slug = title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");

    const post = await Post.create({
      userId: req.user.id,
      title,
      content,
      category,
      slug,
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

/**
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

/**
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

/**
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

/**
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

/**
 * @desc Get posts by user id
 * @param {String} userId - The id of the user
 * @param {String} category - The category of the post
 * @param {String} slug - The slug of the post
 * @param {String} postId - The id of the post
 * @param {String} searchTerm - The search term
 * @param {Number} startIndex - The start index
 * @param {Number} limit - The limit
 * @param {String} order - The sort order
 * @returns {Array} - An array of post objects
 * @access Private
 */

exports.getPostsByUserId = async (req, res) => {
  console.log("User ID:", req.user.id);

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate(),
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      success: true,
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (e) {
    console.log(e);
    return errorResponse({ res, message: e.message, status: 500 });
  }
};
