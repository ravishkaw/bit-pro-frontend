import axiosInstance from "./axiosInstance";

const ROOM_TYPE_BASE_URL = "/room-type";

// Fetch all room types
export const fetchAllRoomTypes = async () => {
  const response = await axiosInstance.get(`${ROOM_TYPE_BASE_URL}/get-all`);
  return response.data;
};
