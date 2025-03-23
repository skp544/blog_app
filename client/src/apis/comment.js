import { commentApi } from "./client.js";
import { handleApiError } from "../lib/helper.js";

/**
 * @desc Create a comment
 * @param {Object} formData - The comment data to create
 * @returns {Object} - The created comment object
 */

export const createCommentApi = async (formData) => {
  try {
    const response = await commentApi.post("/create", formData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * @desc Get post comments
 * @param postId
 * @returns {Array} - The comments Array
 */
export const getPostCommentsApis = async (postId) => {
  try {
    const response = await commentApi.get(`/post-comments/${postId}`);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * @desc Edit comment
 * @param {Object} formData - The comment data to update
 * @param {String} commentId - The comment ID to update
 * @returns {Object} - The updated comment object
 */

export const editCommentApi = async ({ formData, commentId }) => {
  try {
    const response = await commentApi.put(`/edit/${commentId}`, formData);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const likeCommentApi = async (commentId) => {
  try {
    const response = await commentApi.put(`/like/${commentId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
