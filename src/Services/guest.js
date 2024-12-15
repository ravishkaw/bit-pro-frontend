import axios from "axios";

const API_URL = "https://waterlilly.chickenkiller.com/api";

// Fetch All Guest Details From The DB
export const fetchGuests = async () => {
  try {
    const response = await axios.get(`${API_URL}/guests`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const addGuest = async (values) => {
  try {
    await axios.post(`${API_URL}/guest`, values);
  } catch (error) {
    console.error("Error adding customer:", error);
    throw error;
  }
};

export const updateGuest = async (guestId, values) => {
  try {
    await axios.put(`${API_URL}/guest/${guestId}`, values);
  } catch (error) {
    console.error("Error updating guest:", error);
    throw error;
  }
};

export const deleteGuest = async (guestId) => {
  try {
    const response = await axios.delete(`${API_URL}/guest/${guestId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting guest:", error);
    throw error;
  }
};
