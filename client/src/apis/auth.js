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
