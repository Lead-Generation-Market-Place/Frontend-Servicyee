import toast from "react-hot-toast";

export const handleApiError = (error: any) => {
  let message = "Something went wrong. Please try again.";

  if (error.response) {
    console.error("API Response Error:", error.response.status, error.response.data);

    switch (error.response.status) {
      case 400:
        message = "Bad request.";
        break;
      case 401:
        message = "Unauthorized. Please login again.";
        break;
      case 403:
        message = "Access denied.";
        break;
      case 404:
        message = "Resource not found.";
        break;
      case 500:
        message = "Server error. Please try later.";
        break;
    }
  } else if (error.request) {
    console.error("No Response Received:", error.request);
    message = "Cannot reach server. Check your internet connection.";
  } else {
    console.error("Request Setup Error:", error.message);
  }

  toast.error(message);

  return new Error(message);
};
