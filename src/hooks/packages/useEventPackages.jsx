import { useState } from "react";
import { toast } from "react-toastify";

import { eventPackageService } from "../../services/packageApiService";
import { getAllEventReservationServices } from "../../services/eventReservationApiService";

import useCrudHandler from "../common/useCrudHandler";

// Custom hook to manage event package-related operations
const useEventPackages = () => {
  const [eventServices, setEventServices] = useState([]);

  // load reference data
  const loadReferenceData = async () => {
    try {
      const data = await getAllEventReservationServices();
      setEventServices(data);
    } catch (error) {
      toast.error("Error fetching event services");
      setEventServices([]);
    }
  };

  const config = {
    service: eventPackageService,
    entityName: "Event Package",
    additionalFunc: [loadReferenceData],
  };

  // Use base hook for event package operations
  const {
    data,
    loadData,
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
    additionalData: { eventServices },
    loadData,
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

export default useEventPackages;
