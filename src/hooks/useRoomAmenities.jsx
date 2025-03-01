import { roomAmenitiesService } from "../services/roomApiServices";
import useCrudHandler from "./useCrudHandler";

// Custom hook to manage amenity operations
const useAmenities = () => {
  const {
    data,
    loading,
    paginationDetails,
    setPaginationDetails,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
  } = useCrudHandler({
    service: roomAmenitiesService,
    entityName: "Amenity",
  });

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
  };
};

export default useAmenities;
