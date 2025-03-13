import axiosInstance from "./axiosInstance";
import { createApiService } from "./apiService";

const ROOM_BASE_URL = "/rooms";
const ROOM_STATUS_BASE_URL = "/room-status";
const ROOM_TYPE_BASE_URL = "/room-types";
const ROOM_PRICING_RULE_BASE_URL = "/pricing-rules";
const ROOM_FACILITIES = "/room-facilities";

// Generic API service for rooms
export const roomService = createApiService(ROOM_BASE_URL);

// Generic API service for room status
export const roomStatusService = createApiService(ROOM_STATUS_BASE_URL);

// Generic API service for room types
export const roomTypeService = createApiService(ROOM_TYPE_BASE_URL);

// Generic API service for room pricing rules
export const pricingRuleService = createApiService(ROOM_PRICING_RULE_BASE_URL);

// Generic API service for room facilities
export const roomFacilitiesService = createApiService(ROOM_FACILITIES);

// Fetch all rooms types without pagination
export const fetchAllRoomTypes = async () => {
  const response = await axiosInstance.get(`${ROOM_TYPE_BASE_URL}/get-all`);
  return response.data;
};

// Fetch all rooms related to a type
export const fetchAllRoomsToType = async (roomTypeId) => {
  const response = await axiosInstance.get(`${ROOM_BASE_URL}/filter-by-type`, {
    params: { roomTypeId },
  });
  return response.data;
};

// fetch all rooms ( id and number only)
export const fetchAllRooms = async () => {
  return (await axiosInstance.get(`${ROOM_BASE_URL}/get-all`)).data;
};

// fetch all rooms ( id and number only)
export const fetchAllRoomFacilities = async () => {
  return (await axiosInstance.get(`${ROOM_FACILITIES}/get-all`)).data;
};
