import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  fetchAllRooms,
  fetchAllRoomsToType,
  fetchRoom,
} from "../services/room";
import { fetchAllRoomTypes } from "../services/roomTypes";

// Custom hook to manage room-related operations
const useRooms = () => {
  const [rooms, setRooms] = useState([]); // List of rooms
  const [roomTypes, setRoomTypes] = useState([
    {
      key: "all",
      label: "All rooms",
    },
  ]); // List of rooms types
  const [selectedTab, setSelectedTab] = useState({ key: "all" }); // selected room type tab
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch rooms
  const loadRooms = async () => {
    try {
      setLoading(true);
      let resp;
      if (selectedTab.key == "all") {
        resp = await fetchAllRooms();
      } else {
        resp = await fetchAllRoomsToType(selectedTab.key);
      }
      setRooms(resp);
    } catch (err) {
      setRooms([]);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch rooms types
  const loadRoomTypes = async () => {
    try {
      setLoading(true);
      const resp = await fetchAllRoomTypes();
      const mappedRoomTypes = resp.map((roomTypes) => ({
        key: roomTypes.id,
        label: roomTypes.name,
      }));
      setRoomTypes([...roomTypes, ...mappedRoomTypes]);
    } catch (err) {
      setRoomTypes([]);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, [selectedTab]);

  useEffect(() => {
    loadRoomTypes();
  }, []);

  // Fetch details of a single room
  const loadOneRoom = async (roomId) => {
    setLoading(true);
    try {
      const room = await fetchRoom(roomId);
      return room;
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Return states and functions for external use
  return {
    loading,
    rooms,
    roomTypes,
    setSelectedTab,
    loadOneRoom,
  };
};

export default useRooms;
