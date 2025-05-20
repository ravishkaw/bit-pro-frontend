import { useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";

import {
  childService,
  getAllGuests,
} from "../../services/roomReservationApiService";

import useCrudHandler from "../common/useCrudHandler";
import useProfileData from "./useProfileData";

import { mapToSelectOptions } from "../../utils/utils";

// Custom hook to manage child-related operations
const useChildren = () => {
  const [guests, setGuests] = useState([]);

  // get profile data
  const { genders, nationalities, loadProfileData } = useProfileData();

  // Fetch and map guests for parent selection
  const getChildSpecificData = async () => {
    try {
      const guestResp = await getAllGuests();
      setGuests(mapToSelectOptions(guestResp));
    } catch (err) {
      setGuests([]);
      toast.error(
        err.message || "Failed to load guest data for parent selection"
      );
    }
  };

  // Format child data to match form requirements
  const formatChildData = (child) => ({
    ...child,
    dob: dayjs(child.dob),
  });

  const config = {
    service: childService,
    entityName: "Child",
    formatData: formatChildData,
    additionalFunc: [getChildSpecificData, loadProfileData],
  };

  // Use base hook for child operations
  const {
    data,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
    restoreItem,
    loading,
    paginationDetails,
    setPaginationDetails,
  } = useCrudHandler(config);

  // Return states and functions for external use
  return {
    data,
    loading,
    additionalData: {
      guests,
      genders,
      nationalities,
    },
    paginationDetails,
    setPaginationDetails,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
    restoreItem,
  };
};

export default useChildren;
