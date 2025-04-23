import { useState } from "react";
import { toast } from "react-toastify";

import {
  roomReservationAmenityService,
  roomReservationAmenityCategoryService,
} from "../../services/reservationApiService";

import useCrudHandler from "../common/useCrudHandler";

import { mapToSelectOptions } from "../../utils/utils";

// Custom hook to manage room reservation amenity operations
const useRoomReservationAmenities = () => {
  const [amenityCategory, setAmenityCategory] = useState();

  const loadReferenceData = async () => {
    try {
      const resp = await roomReservationAmenityCategoryService.getAll();
      setAmenityCategory(mapToSelectOptions(resp));
    } catch (error) {
      setAmenityCategory([]);
      toast.error("error fetching bed types");
    }
  };

  const config = {
    service: roomReservationAmenityService,
    entityName: "Room Reservation Amenity",
    additionalFunc: [loadReferenceData],
  };

  // Use base hook for room reservation amenity operations
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
    additionalData: { amenityCategory },
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

export default useRoomReservationAmenities;
