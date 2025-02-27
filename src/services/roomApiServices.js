import axiosInstance from "./axiosInstance";
import { createApiService } from "./apiService";

const ROOM_BASE_URL = "/rooms";
const ROOM_TYPE_BASE_URL = "/room-types";
const ROOM_PRICING_RULE_BASE_URL = "/pricing-rules";

// Generic API service for room types
export const roomService = createApiService(ROOM_BASE_URL);

// Generic API service for room types
export const roomTypeService = createApiService(ROOM_TYPE_BASE_URL);

// Generic API service for room pricing rules
export const pricingRuleService = createApiService(ROOM_PRICING_RULE_BASE_URL);

// Fetch all rooms related to a type
export const fetchAllRoomsToType = async (roomTypeId) => {
  console.log(roomTypeId);

  const response = await axiosInstance.get(
    `${ROOM_BASE_URL}/get-rooms-to-type`,
    { params: { roomTypeId } }
  );
  console.log(response);

  return response.data;
};
