import { createApiService } from "./apiService";
import axiosInstance from "./axiosInstance";

const INVENTORY_BASE_URL = "/inventory";
const ROOM_INVENTORY = "/room-inventory";

// Generic API service for inventory
export const inventoryService = createApiService(INVENTORY_BASE_URL);

// Generic API service for room inventory
export const roomInventoryService = createApiService(ROOM_INVENTORY);

// get all inventory items
export const getAllItems = () => {
  const items = axiosInstance.get(`${INVENTORY_BASE_URL}/get-all`);
  return items;
};

// get item quantity of a room
export const getQuantityItemRoom = async (inventoryId, roomId) => {
  const quantity = await axiosInstance.get(`${ROOM_INVENTORY}/quantity`, {
    params: { inventoryId, roomId },
  });
  return quantity.data;
};
