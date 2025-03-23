import { postApi } from "./client.js";
import { handleApiError } from "../lib/helper.js";

/**
 * @desc Create post
 * @param formData
 */

export const createPostApi = async (formData) => {
  try {
    const response = await postApi.post("/create", formData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * @desc Fetch single post
 * @param postId
 */

export const fetchPostApi = async (postId) => {
  try {
    const response = await postApi.get(`/${postId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * @desc Fetch all posts
 * @param user
 * @param startIndex
 * @param slug
 * @param limit
 */

export const fetchUserPostsApi = async ({ user, startIndex, slug, limit }) => {
  try {
    if (startIndex) {
      const response = await postApi.get(
        `/posts/user?userId=${startIndex}&startIndex=${startIndex}`,
      );
      return response.data;
    } else if (slug) {
      const response = await postApi.get(`/posts/user?slug=${slug}`);
      return response.data;
    } else if (limit) {
      const response = await postApi.get(`/posts/user?limit=${limit}`);
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

/**
 * @desc Delete post
 * @param postId
 * @returns {Promise<*|{success: boolean, message: *}>}
 */
export const deletePostApi = async (postId) => {
  try {
    const response = await postApi.delete(`/delete/${postId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * @desc Update post
 * @param {String} postId - The id of the post
 * @param {Object} formData - The post data to update
 * @returns {Object} - The updated post object
 
 * */

export const updatePostApi = async (postId, formData) => {
  try {
    const response = await postApi.put(`/update/${postId}`, formData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
