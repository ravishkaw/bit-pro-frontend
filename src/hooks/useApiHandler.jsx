import { toast } from "react-toastify";

//Add handle api call function to handle edit add delete and restore
const handleApiCall = async (apiCallFn, successMessage, setLoading, reload) => {
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
