import { useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";

import {
  inventoryItemTypeService,
  inventoryService,
  inventoryStatusService,
} from "../../services/inventoryApiService";
import useCrudHandler from "../common/useCrudHandler";

import { mapToSelectOptions } from "../../utils/utils";

// Custom hook to manage inventory-related operations
const useInventory = () => {
  const [inventoryStatus, setInventoryStatus] = useState();
  const [inventoryItemType, setInventoryItemType] = useState();

  // load reference data
  const loadReferenceData = async () => {
    try {
      const [statusResp, itemTypeResp] = await Promise.all([
        inventoryStatusService.getAll(),
        inventoryItemTypeService.getAll(),
      ]);
      setInventoryStatus(mapToSelectOptions(statusResp));
      setInventoryItemType(mapToSelectOptions(itemTypeResp));
    } catch (error) {
      setInventoryItemType([]);
      setInventoryStatus([]);
      toast.error("Failed to load reference data!");
    }
  };

  // Format guest data to match form requirements
  const formatItemData = (item) => ({
    ...item,
    lastRestockedDate: dayjs(item.lastRestockedDate),
  });

  const config = {
    service: inventoryService,
    entityName: "Inventory",
    formatData: formatItemData,
    additionalFunc: [loadReferenceData],
  };

  // Use base hook for room type operations
  const {
    data,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
    restoreItem,
    loading,
    paginationDetails,
    setPaginationDetails,
  } = useCrudHandler(config);

  // Return states and functions for external use
  return {
    data,
    additionalData: { inventoryItemType, inventoryStatus },
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
    restoreItem,
    loading,
    paginationDetails,
    setPaginationDetails,
  };
};

export default useInventory;
