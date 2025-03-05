import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import {
  pricingRuleService,
  fetchAllRoomTypes,
} from "../services/roomApiServices";
import useCrudHandler from "./useCrudHandler";

import { mapToSelectOptions } from "../utils/utils";

// Custom hook to manage room type operations
const usePricingRules = () => {
  const [roomTypes, setRoomTypes] = useState([]); // store room types

  // Format pricing rule date
  const formatPricingRule = (pricingRule) => ({
    ...pricingRule,
    startDate: dayjs(pricingRule.startDate),
    endDate: dayjs(pricingRule.endDate),
    statusName: pricingRule.statusName == "Active" ? true : false,
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
  } = useCrudHandler(config);

  // fetch room types and map to select
  const getRoomTypes = async () => {
    try {
      const resp = await fetchAllRoomTypes();
      // filter deleted room types
      const filterDeleted = resp.filter(
        (roomType) => roomType.isDeleted != true
      );
      const mappedRoomTypes = mapToSelectOptions(filterDeleted);
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
    data,
    roomTypes,
    loading,
    paginationDetails,
    setPaginationDetails,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
  };
};

export default usePricingRules;
