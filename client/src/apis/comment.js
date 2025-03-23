import { commentApi } from "./client.js";
import { handleApiError } from "../lib/helper.js";

export const createCommentApi = async (formData) => {
  try {
    const response = await commentApi.post("/create", formData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getPostCommentsApis = async (postId) => {
  try {
    const response = await commentApi.get(`/post-comments/${postId}`);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
