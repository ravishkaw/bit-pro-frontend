import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { fetchAllRoomTypes } from "../services/roomTypes";

// Custom hook to manage room-related operations
const useRoomTypes = () => {
  const [roomTypes, setRoomTypes] = useState([]); // List of rooms types
  const [loading, setLoading] = useState(false); // Loading state

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

  // Return states and functions for external use
  return {
    loading,
    roomTypes,
  };
};

export default useRoomTypes;
