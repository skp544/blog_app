import { userApi } from "./client.js";
import { handleApiError } from "../lib/helper.js";

export const updateUserApi = async (formData) => {
  try {
    const response = await userApi.put("/update", formData);

    return response.data;
  } catch (e) {
    return handleApiError(e);
  }
};

export const deleteUserApi = async () => {
  try {
    const response = await userApi.delete("/delete");

    return response.data;
  } catch (e) {
    return handleApiError(e);
  }
};
