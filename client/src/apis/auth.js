import { authApi } from "./client.js";
import { handleApiError } from "../lib/helper.js";

export const signUpApi = async (formData) => {
  try {
    const response = await authApi.post("/sign-up", formData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const signInApi = async (formData) => {
  try {
    const response = await authApi.post("/sign-in", formData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const googleAuthApi = async (formData) => {
  try {
    const response = await authApi.post("/google", formData);

    return response.data;
  } catch (e) {
    return handleApiError(e);
  }
};
