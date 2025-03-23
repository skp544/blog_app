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

exports.editComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { id } = req.params;

    if (!content) {
      return errorResponse({ res, message: "Content is required" });
    }

    const comment = await Comment.findById(id);

    if (!comment) {
      return errorResponse({ res, message: "Comment not found", status: 404 });
    }

    if (comment.userId.toString() !== req.user.id) {
      return errorResponse({ res, message: "Unauthorized", status: 401 });
    }

    comment.content = content;
    await comment.save();

    return res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment,
    });
  } catch (e) {
    return errorResponse({ res, message: e.message });
  }
};

exports.likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return errorResponse({ res, message: "Comment not found", status: 404 });
    }

    const userIndex = comment.likes.indexOf(req.user.id);

    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();

    return res.status(200).json({
      success: true,
      message: "Comment liked successfully",
      comment,
    });
  } catch (e) {
    return errorResponse({ res, message: e.message });
  }
};
