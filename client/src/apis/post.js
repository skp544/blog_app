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
