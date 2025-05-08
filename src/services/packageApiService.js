import { createApiService } from "./apiService";
import axiosInstance from "./axiosInstance";

const ROOM_PACKAGES_BASE_URL = "/room-packages";
const EVENT_PACKAGES_BASE_URL = "/event-packages";

// Generic API service for room packages
export const roomPackageService = createApiService(ROOM_PACKAGES_BASE_URL);

// Get all room packages without pagination and sorting
export const getAllRoomPackages = async () => {
  const response = await axiosInstance.get(`${ROOM_PACKAGES_BASE_URL}/get-all`);
  return response.data;
};

// Generic API service for event packages
export const eventPackageService = createApiService(EVENT_PACKAGES_BASE_URL);

// Get all event packages without pagination and sorting
export const getAllEventPackages = async () => {
  const response = await axiosInstance.get(
    `${EVENT_PACKAGES_BASE_URL}/get-all`
  );
  return response.data;
};
