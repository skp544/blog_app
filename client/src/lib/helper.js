/**
 * Handles API errors for Axios responses
 * @param {Object} error - The error object from Axios
 * @returns {object} - The error message
 */
export const handleApiError = (error) => {
  let errorMessage = "Something went wrong. Please try again.";

  if (error.response) {
    // Server responded with a status code outside the 2xx range
    const { status, data } = error.response;
    errorMessage = data?.message || `Request failed with status ${status}`;
  } else if (error.request) {
    // Request was made but no response was received
    errorMessage =
      "No response from server. Please check your internet connection.";
  } else {
    // Something else went wrong while setting up the request
    errorMessage = error.message || errorMessage;
  }

  console.error("API Error:", errorMessage);
  return { success: false, message: errorMessage };
};
