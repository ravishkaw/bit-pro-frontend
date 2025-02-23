import axiosInstance from "./axiosInstance";

const ROOM_BASE_URL = "/room";

// Fetch all rooms
export const fetchAllRooms = async () => {
  const response = await axiosInstance.get(`${ROOM_BASE_URL}/get-all`);
  return response.data;
};

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

// Fetch single room
export const fetchRoom = async (roomId) => {
  const resp = await axiosInstance.get(`${ROOM_BASE_URL}/room/${roomId}`);
  return resp.data;
};
