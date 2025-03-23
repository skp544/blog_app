import { userApi } from "./client.js";
import { handleApiError } from "../lib/helper.js";

/**
 * @desc Update user profile
 * @param {Object} formData - The user data to update
 * @returns {Object} - The updated user object
 */

export const updateUserApi = async (formData) => {
  try {
    const response = await userApi.put("/update", formData);

    return response.data;
  } catch (e) {
    return handleApiError(e);
  }
};

/**
 * @desc Delete user
 * @returns {Promise<*|{success: boolean, message: *}>}
 */

export const deleteUserApi = async () => {
  try {
    const response = await userApi.delete("/delete");

    return response.data;
  } catch (e) {
    return handleApiError(e);
  }
};

/**
 * @desc Get all users
 * @param startIndex
 */

export const getAllUsersApi = async ({ startIndex = 0 }) => {
  try {
    console.log(startIndex);
    if (startIndex !== undefined && startIndex > 0) {
      const response = await userApi.get(`/all-users?startIndex=${startIndex}`);

      return response.data;
    } else {
      const response = await userApi.get("/all-users");
      return response.data;
    }
  } catch (e) {
    return handleApiError(e);
  }
};

/**
 * @desc Delete another user
 * @param userId
 * @returns {Promise<*|{success: boolean, message: *}>}
 */

export const deleteAnotherUserApi = async (userId) => {
  try {
    const response = await userApi.delete(`/delete-user/${userId}`);

    return response.data;
  } catch (e) {
    return handleApiError(e);
  }
};

/**
 * @desc Get user
 * @param userId
 */
export const getUserApi = async (userId) => {
  try {
    const response = await userApi.get(`/${userId}`);
    return response.data;
  } catch (e) {
    return handleApiError(e);
  }
};
