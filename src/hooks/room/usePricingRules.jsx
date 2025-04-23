import dayjs from "dayjs";

import { pricingRuleService } from "../../services/roomApiServices";
import useCrudHandler from "../common/useCrudHandler";

// Custom hook to manage room type operations
const usePricingRules = () => {
  // Format pricing rule date
  const formatPricingRule = (pricingRule) => ({
    ...pricingRule,
    startDate: dayjs(pricingRule.startDate),
    endDate: dayjs(pricingRule.endDate),
  });

  const config = {
    service: pricingRuleService,
    entityName: "Room Pricing Rule",
    formatData: formatPricingRule,
  };

  // Use base hook for room type operations
  const {
    data,
    loading,
    paginationDetails,
    setPaginationDetails,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
    restoreItem,
  } = useCrudHandler(config);

  // Return states and functions for external use
  return {
    data,
    loading,
    paginationDetails,
    setPaginationDetails,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
    restoreItem,
  };
};

export default usePricingRules;
