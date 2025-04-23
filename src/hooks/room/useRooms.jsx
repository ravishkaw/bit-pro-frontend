import { useState } from "react";
import { toast } from "react-toastify";
import {
  roomService,
  roomStatusService,
  fetchAllRoomTypes,
  fetchAllRoomFacilities,
} from "../../services/roomApiServices";
import useCrudHandler from "../common/useCrudHandler";
import { mapToSelectOptions } from "../../utils/utils";

// Custom hook to manage room-related operations
const useRooms = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [roomFacilities, setRoomFacilities] = useState([]);
  const [roomStatus, setRoomStatus] = useState([]);

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

  const config = {
    service: roomService,
    entityName: "Room",
    additionalFunc: [loadReferenceData],
  };
  // Use base hook for room operations
  const {
    data: rooms,
    loading,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
    restoreItem,
  } = useCrudHandler(config);

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
  };
};

export default useRooms;
