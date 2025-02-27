import axiosInstance from "./axiosInstance";

const ROOM_TYPE_BASE_URL = "/room-type";

// Fetch all room types
export const fetchAllRoomTypes = async () => {
  const response = await axiosInstance.get(`${ROOM_TYPE_BASE_URL}/get-all`);
  return response.data;
};

// Fetch single Room Type
export const fetchRoomType = async (roomTypeId) => {
  const resp = await axiosInstance.get(
    `${ROOM_TYPE_BASE_URL}/room-type/${roomTypeId}`
  );
  return resp.data;
};

// Add Room Type Details
export const addRoomType = async (values) => {
  await axiosInstance.post(`${ROOM_TYPE_BASE_URL}/room-type`, values);
};

// Update Room Type
export const updateRoomType = async (roomTypeId, values) => {
  await axiosInstance.put(
    `${ROOM_TYPE_BASE_URL}/room-type/${roomTypeId}`,
    values
  );
};

// Delete Room Type
export const deleteRoomType = async (roomTypeId) => {
  const response = await axiosInstance.delete(
    `${ROOM_TYPE_BASE_URL}/room-type/${roomTypeId}`
  );
  return response.data;
};
