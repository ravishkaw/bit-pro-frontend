import { billingService } from "../../services/billingApiService";
import useCrudHandler from "../common/useCrudHandler";

const useBillings = () => {
  const config = {
    service: billingService,
    entityName: "Billings",
  };

  // Use base hook for billing operations
  const {
    data,
    loadOneItem,
    loading,
    paginationDetails,
    setPaginationDetails,
  } = useCrudHandler(config);

  // Return states and functions for external use
  return {
    data,
    loadOneItem,
    loading,
    paginationDetails,
    setPaginationDetails,
  };
};
export default useBillings;
