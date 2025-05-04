import { useState } from "react";
import { toast } from "react-toastify";

import useCrudHandler from "../common/useCrudHandler";
import { roomPackageService } from "../../services/packageApiService";
import { getAllRoomReservationAmenities } from "../../services/reservationApiService";

// Custom hook to manage room package-related operations
const useRoomPackages = () => {
  const [amenities, setAmenities] = useState([]);
  // load reference data
  const loadReferenceData = async () => {
    try {
      const amenitiesData = await getAllRoomReservationAmenities();
      setAmenities(amenitiesData);
    } catch (error) {
      toast.error("Error fetching amenities");
      setAmenities([]);
    }
  };

  const config = {
    service: roomPackageService,
    entityName: "Room Package",
    additionalFunc: [loadReferenceData],
  };

  // Use base hook for room package operations
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
    loadData,
    additionalData: { amenities },
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

export default useRoomPackages;
