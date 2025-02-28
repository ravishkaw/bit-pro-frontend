import { useEffect, useState } from "react";
import {
  pricingRuleService,
  roomTypeService,
} from "../services/roomApiServices";
import useCrudHandler from "./useCrudHandler";
import dayjs from "dayjs";
import { mapToSelectOptions } from "../utils/utils";

// Custom hook to manage room type operations
const usePricingRules = () => {
  const [roomTypes, setRoomTypes] = useState([]); // store room types
  // Format pricing rule date
  const formatPricingRule = (pricingRule) => ({
    ...pricingRule,
    startDate: dayjs(pricingRule.startDate),
    endDate: dayjs(pricingRule.endDate),
  });

  const {
    data: pricingRules,
    loading,
    paginationDetails,
    setPaginationDetails,
    loadOneItem: loadOnePricingRule,
    addItem: addPricingRule,
    updateItem: updatePricingRule,
    deleteItem: deletePricingRule,
  } = useCrudHandler({
    service: pricingRuleService,
    entityName: "Room Pricing Rule",
    formatData: formatPricingRule,
    isPaginated: false,
  });

  // fetch room types and map to select
  const getRoomTypes = async () => {
    try {
      const resp = await roomTypeService.getAll();    
      const mappedRoomTypes = mapToSelectOptions(resp);
      setRoomTypes(mappedRoomTypes);
    } catch (error) {
      setRoomTypes([]);
      toast.error(error.message || "Failed to load room types");
    }
  };

  useEffect(() => {
    getRoomTypes();
  }, []);

  // Return states and functions for external use
  return {
    pricingRules,
    loading,
    loadOnePricingRule,
    paginationDetails,
    setPaginationDetails,
    addPricingRule,
    updatePricingRule,
    deletePricingRule,
    roomTypes,
  };
};

export default usePricingRules;
