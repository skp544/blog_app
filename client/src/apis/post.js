import { postApi } from "./client.js";
import { handleApiError } from "../lib/helper.js";

export const createPostApi = async (formData) => {
  try {
    const response = await postApi.post("/create", formData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchPostApi = async (postId) => {
  try {
    const response = await postApi.get(`/${postId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchUserPostsApi = async ({ user, startIndex }) => {
  try {
    if (startIndex) {
      const response = await postApi.get(
        `/posts/user?userId=${startIndex}&startIndex=${startIndex}`,
      );
      return response.data;
    } else if (user) {
      const response = await postApi.get(`/posts/user?userId=${user.id}`);
      return response.data;
    } else {
      return { success: false, message: "Posts not found" };
    }
  } catch (error) {
    return handleApiError(error);
  }
};

export const deletePostApi = async (postId) => {
  try {
    const response = await postApi.delete(`/delete/${postId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const updatePostApi = async (postId, formData) => {
  try {
    const response = await postApi.put(`/update/${postId}`, formData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
