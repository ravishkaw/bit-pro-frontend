import { toast } from "react-toastify";

// Utility function to handle CRUD API calls
const handleApiCall = async (
  apiCallFn, // Function to make the API call
  successMessage, // Message to show on success
  setLoading, // Function to set loading state
  reload // Function to reload data after the operation
) => {
  setLoading(true);
  try {
    await apiCallFn();
    toast.success(successMessage);
    reload();
  } catch (err) {
    toast.error(err.response?.data?.message || err.message);
  } finally {
    setLoading(false);
  }
};

export default handleApiCall;
