import { useState } from "react";
import { toast } from "react-toastify";

import {
  roomInventoryService,
  getAllItems,
  getQuantityItemRoom,
} from "../services/inventoryApiService";
import { fetchAllRooms } from "../services/roomApiServices";

import useCrudHandler from "./useCrudHandler";
import dayjs from "dayjs";

// Custom hook to manage room inventory operations
const useRoomInventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [rooms, setRooms] = useState([]);

  // get all inventory items
  const loadReferenceData = async () => {
    try {
      const [inventoryResp, roomsResp] = await Promise.all([
        getAllItems(),
        fetchAllRooms(),
      ]);
      setInventoryItems(inventoryResp.data);
      setRooms(roomsResp);
    } catch (error) {
      toast.error(error.message || "Failed to inventory items");
    }
  };

  // format single inventory
  const formatData = (item) => ({
    ...item,
    lastCheckedDate: dayjs(item.lastCheckedDate),
  });

  const config = {
    service: roomInventoryService,
    entityName: "Room Inventory",
    formatData: formatData,
    additionalFunc: [loadReferenceData],
  };

  // Use base hook for room inventory operations
  const {
    data,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
    loading,
    paginationDetails,
    setPaginationDetails,
  } = useCrudHandler(config);

  // Return states and functions for external use
  return {
    data,
    additionalData: { rooms, inventoryItems, getQuantityItemRoom },
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
    loading,
    paginationDetails,
    setPaginationDetails,
  };
};

export default useRoomInventory;
