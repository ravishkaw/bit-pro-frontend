import { useState } from "react";
import { toast } from "react-toastify";

import { roomTypeService, bedTypeService } from "../services/roomApiServices";
import useCrudHandler from "./useCrudHandler";

import { mapToSelectOptions } from "../utils/utils";

// Custom hook to manage room type operations
const useRoomTypes = () => {
  const [bedTypes, setBedTypes] = useState([]);

  const loadReferenceData = async () => {
    try {
      const resp = await bedTypeService.getAll();
      setBedTypes(mapToSelectOptions(resp));
    } catch (error) {
      setBedTypes([]);
      toast.error("error fetching bed types");
    }
  };
  const config = {
    service: roomTypeService,
    entityName: "Room Type",
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
    additionalData: { bedTypes },
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

export default useRoomTypes;
