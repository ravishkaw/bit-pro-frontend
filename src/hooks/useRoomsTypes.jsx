import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  fetchAllRoomTypes,
  fetchRoomType,
  addRoomType,
  updateRoomType,
  deleteRoomType,
} from "../services/roomTypes";
import handleApiCall from "./useApiHandler";
import usePagination from "./usePagination";

// Custom hook to manage room-related operations
const useRoomTypes = () => {
  const [roomTypes, setRoomTypes] = useState([]); // List of rooms types
  const [loading, setLoading] = useState(false); // Loading state

  // Pagination and sorting details
  const { paginationDetails, setPaginationDetails } = usePagination();

  // Fetch rooms types
  const loadRoomTypes = async () => {
    try {
      setLoading(true);
      const resp = await fetchAllRoomTypes();
      setRoomTypes(resp);
    } catch (err) {
      setRoomTypes([]);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoomTypes();
  }, []);

  // Fetch details of a single room type
  const loadOneRoomType = async (roomTypeId) => {
    setLoading(true);
    try {
      const roomType = await fetchRoomType(roomTypeId);
      return roomType;
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new roomType
  const addAnRoomType = async (values) => {
    handleApiCall(
      () => addRoomType(values),
      `roomType ${values?.roomTypename} added successfully`,
      setLoading,
      loadRoomTypes
    );
  };

  // Update an existing roomType
  const updateAnRoomType = async (roomTypeId, values) => {
    handleApiCall(
      () => updateRoomType(roomTypeId, values),
      `roomType ${values?.roomTypename} updated successfully`,
      setLoading,
      loadRoomTypes
    );
  };

  // Delete a roomType
  const deleteAnRoomType = async (roomTypeId) => {
    handleApiCall(
      () => deleteRoomType(roomTypeId),
      `roomType with ID ${roomTypeId} deleted successfully`,
      setLoading,
      loadRoomTypes
    );
  };

  // Return states and functions for external use
  return {
    loading,
    roomTypes,
    paginationDetails,
    setPaginationDetails,
    loadOneRoomType,
    addAnRoomType,
    updateAnRoomType,
    deleteAnRoomType,
  };
};

export default useRoomTypes;
