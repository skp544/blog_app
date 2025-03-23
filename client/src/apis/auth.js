import { authApi } from "./client.js";
import { handleApiError } from "../lib/helper.js";

/**
 * @desc Sign up user
 * @param formData
 */
export const signUpApi = async (formData) => {
  try {
    const response = await authApi.post("/sign-up", formData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * @desc Sign in user
 * @param formData
 */
export const signInApi = async (formData) => {
  try {
    const response = await authApi.post("/sign-in", formData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * @desc google auth
 * @param formData
 */
export const googleAuthApi = async (formData) => {
  try {
    const response = await authApi.post("/google", formData);

    return response.data;
  } catch (e) {
    return handleApiError(e);
  }
};
