const { errorResponse } = require("../lib/helper");
const Comment = require("../models/comment-model");

/**
 * @desc Create a comment
 * @body {String} content
 * @body {String} postId
 * @returns {Object} - The created comment object
 */
exports.createComment = async (req, res) => {
  try {
    const { content, postId } = req.body;

    if (!content) {
      return errorResponse({ res, message: "Content is required" });
    }

    if (!postId) {
      return errorResponse({ res, message: "Post ID is required" });
    }

    const comment = await Comment.create({
      content,
      postId,
      userId: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Comment created successfully",
      comment,
    });
  } catch (e) {
    return errorResponse({ res, message: e.message });
  }
};

/**
 *
 * @param postId
 * @returns {Object} - The comments object
 */
exports.getPostComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      comments,
    });
  } catch (e) {
    return errorResponse({ res, message: e.message });
  }
};
