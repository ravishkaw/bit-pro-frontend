import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  roomService,
  fetchAllRoomTypes,
  fetchAllRoomsToType,
} from "../services/roomApiServices";
import useCrudHandler from "./useCrudHandler";

// Custom hook to manage room-related operations
const useRooms = () => {
  const [roomTypes, setRoomTypes] = useState([
    {
      value: "all",
      label: "All Rooms",
    },
  ]);
  const [selectedTab, setSelectedTab] = useState("all");
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const config = {
    service: roomService,
    entityName: "Room",
  };
  // Use base hook for room operations
  const { loadOneItem } = useCrudHandler(config);

  // Fetch rooms based on selected tab
  const loadRooms = async () => {
    try {
      setLoading(true);
      let resp;
      if (selectedTab === "all") {
        resp = await roomService.getAll();
      } else {
        resp = await fetchAllRoomsToType(selectedTab);
      }
      setRooms(resp);
    } catch (err) {
      setRooms([]);
      toast.error(err.message || "Failed to load rooms");
    } finally {
      setLoading(false);
    }
  };

  // Fetch room types
  const loadRoomTypes = async () => {
    try {
      const resp = await fetchAllRoomTypes();
      const mappedRoomTypes = resp
        .filter((availableRoomTypes) => !availableRoomTypes.isDeleted)
        .map((roomType) => ({
          value: roomType.id,
          label: roomType.name,
        }));
      setRoomTypes([...roomTypes, ...mappedRoomTypes]);
    } catch (err) {
      setRoomTypes([{ key: "all", label: "All rooms" }]);
      toast.error(err.message || "Failed to load room types");
    }
  };

  // Load rooms when selected tab changes
  useEffect(() => {
    loadRooms();
  }, [selectedTab]);

  // Load room types on mount
  useEffect(() => {
    loadRoomTypes();
  }, []);

  return {
    loading,
    rooms,
    roomTypes,
    setSelectedTab,
    loadOneItem,
  };
};

export default useRooms;
