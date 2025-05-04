import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  roomService,
  roomStatusService,
  fetchAllRoomTypes,
  fetchAllRoomFacilities,
  fetchFilteredRooms,
} from "../../services/roomApiServices";
import { mapToSelectOptions } from "../../utils/utils";

// Custom hook to manage room-related operations
const useRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [roomTypes, setRoomTypes] = useState([]);
  const [roomFacilities, setRoomFacilities] = useState([]);
  const [roomStatus, setRoomStatus] = useState([]);
  const [filters, setFilters] = useState({
    roomTypeId: null,
    statusId: null,
    minPrice: null,
    maxPrice: null,
    adults: null,
    children: null,
    infants: null,
    searchQuery: null,
  });

  // Function to load rooms with filters
  const loadRooms = async (filterParams = {}) => {
    setLoading(true);
    try {
      // Check if any filter params are active
      const hasActiveFilters = Object.values(filterParams).some(
        value => value !== null && value !== undefined
      );
      
      let data;
      if (hasActiveFilters) {
        // Use filtered endpoint if filters are applied
        data = await fetchFilteredRooms(filterParams);
      } else {
        // Otherwise get all rooms
        data = await roomService.getAll();
      }
      setRooms(data);
    } catch (error) {
      console.error("Error loading rooms:", error);
      toast.error("Failed to load rooms");
    } finally {
      setLoading(false);
    }
  };

  // Apply filters and load filtered rooms
  const applyFilters = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    loadRooms(updatedFilters);
  };

  // Fetch reference data
  const loadReferenceData = async () => {
    try {
      const [roomResp, roomFacilityResp, roomStatusResp] = await Promise.all([
        fetchAllRoomTypes(),
        fetchAllRoomFacilities(),
        roomStatusService.getAll(),
      ]);
      setRoomTypes(roomResp);
      setRoomFacilities(roomFacilityResp);
      setRoomStatus(mapToSelectOptions(roomStatusResp));
    } catch (err) {
      setRoomTypes([]);
      toast.error(err.message || "Failed to load room reference data");
    }
  };

  // Load data when component mounts
  useEffect(() => {
    loadRooms();
    loadReferenceData();
  }, []);

  // fetch a single item
  const loadOneItem = async (id) => {
    try {
      const item = await roomService.getById(id);
      return item;
    } catch (err) {
      toast.error(err.message || "Failed to load room details");
      return null;
    }
  };

  // Function to handle common API calls
  const handleApiCall = async (apiCallFn, successMessage) => {
    setLoading(true);
    try {
      await apiCallFn();
      toast.success(successMessage);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      loadRooms(filters); 
      setLoading(false);
    }
  };

  // Add new item
  const addItem = async (values) => {
    handleApiCall(() => roomService.create(values), "Room added successfully");
  };

  // update an item
  const updateItem = async (id, values) => {
    handleApiCall(
      () => roomService.update(id, values),
      "Room updated successfully"
    );
  };

  // delete a item
  const deleteItem = async (id) => {
    handleApiCall(() => roomService.remove(id), "Room deleted successfully");
  };

  // restore item ( if restore can be done)
  const restoreItem = async (id) => {
    handleApiCall(() => roomService.restore(id), "Room restored successfully");
  };

  return {
    rooms,
    additionalData: { roomTypes, roomFacilities, roomStatus },
    loading,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
    restoreItem,
    loadReferenceData,
    applyFilters,
    filters,
  };
};

export default useRooms;
