import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  roomService,
  roomTypeService,
  fetchAllRoomsToType,
} from "../services/roomApiServices";
import useCrudHandler  from "./useCrudHandler";

// Custom hook to manage room-related operations
const useRooms = () => {
  const [roomTypes, setRoomTypes] = useState([
    {
      key: "all",
      label: "All rooms",
    },
  ]);
  const [selectedTab, setSelectedTab] = useState({ key: "all" });
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  // Use base hook for room operations with custom loading
  const { loadOneItem: baseLoadOneRoom } = useCrudHandler ({
    service: roomService,
    entityName: "Room",
    isPaginated: false,
    initialLoad: false,
  });

  // Fetch rooms based on selected tab
  const loadRooms = async () => {
    try {
      setLoading(true);
      let resp;
      if (selectedTab.key === "all") {
        resp = await roomService.getAll();
      } else {
        resp = await fetchAllRoomsToType(selectedTab.key);
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
      setLoading(true);
      const resp = await roomTypeService.getAll();

      const mappedRoomTypes = resp
        .filter((availableRoomTypes) => !availableRoomTypes.isDeleted)
        .map((roomType) => ({
          key: roomType.id,
          label: roomType.name,
        }));
      setRoomTypes([...roomTypes, ...mappedRoomTypes]);
    } catch (err) {
      setRoomTypes([{ key: "all", label: "All rooms" }]);
      toast.error(err.message || "Failed to load room types");
    } finally {
      setLoading(false);
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

  // Use the base hook's loadOneItem but expose it with the original name
  const loadOneRoom = async (roomId) => {
    return await baseLoadOneRoom(roomId);
  };

  return {
    loading,
    rooms,
    roomTypes,
    setSelectedTab,
    loadOneRoom,
  };
};

export default useRooms;
