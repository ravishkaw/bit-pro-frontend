import { useEffect, useState } from "react";

import {
  getReservationsToAStatus,
  roomReservationService,
  roomReservationSourceService,
  roomReservationStatusService,
  roomReservationTypeService,
  checkRoomReservationPricing,
} from "../../services/reservationApiService";
import useCrudHandler from "../common/useCrudHandler";

import { mapToSelectOptions } from "../../utils/utils";
import usePagination from "../common/usePagination";
import { fetchAvailableRooms } from "../../services/roomApiServices";

// Custom hook to manage room reservation operations
const useRoomReservation = () => {
  const [reservationData, setReservationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Checked-In");

  const [reservationTypes, setReservationTypes] = useState([]);
  const [reservationStatus, setReservationStatus] = useState([]);
  const [reservationSources, setReservationSources] = useState([]);

  const { paginationDetails, setPaginationDetails } = usePagination();

  // load room reservation data depending on the selected tab
  const loadRoomReservationData = async () => {
    setLoading(true);
    try {
      const resp = await getReservationsToAStatus({
        pageNumber: paginationDetails.current - 1, // Convert to 0-based index to match with backend and antd
        pageSize: paginationDetails.pageSize,
        sortBy: paginationDetails.sortBy,
        sortOrder: paginationDetails.sortOrder,
        searchQuery: paginationDetails.searchQuery,
        status: selectedTab,
      });
      setReservationData(resp.data);
      setPaginationDetails((prev) => ({ ...prev, total: resp.totalElements }));
      setLoading(false);
    } catch (error) {
      console.error("Error loading room reservation data:", error);
      setLoading(false);
    }
  };

  // load reference data for room reservation
  const loadReferenceData = async () => {
    try {
      const [types, status, sources] = await Promise.all([
        roomReservationTypeService.getAll(),
        roomReservationStatusService.getAll(),
        roomReservationSourceService.getAll(),
      ]);
      setReservationTypes(mapToSelectOptions(types));
      setReservationStatus(mapToSelectOptions(status));
      setReservationSources(mapToSelectOptions(sources));
    } catch (error) {
      setReservationStatus([]);
      setReservationTypes([]);
      console.error("Error loading reference data:", error);
    }
  };

  // Load room reservation data when the component mounts
  useEffect(() => {
    loadRoomReservationData();
    loadReferenceData();
  }, [
    selectedTab,
    paginationDetails.current,
    paginationDetails.pageSize,
    paginationDetails.sortBy,
    paginationDetails.sortOrder,
    paginationDetails.searchQuery,
  ]);

  const config = {
    service: roomReservationService,
    entityName: "Room Reservation",
  };

  // Use base hook for room reservation operations
  const { loadOneItem, addItem, updateItem, deleteItem, restoreItem } =
    useCrudHandler({ ...config, disableAutoLoad: true });

  // get available rooms for a stay between two dates with adults, children and infants
  const fetchRooms = async (
    checkInDate,
    checkOutDate,
    adults,
    children,
    infants
  ) => {
    try {
      const resp = await fetchAvailableRooms(
        checkInDate,
        checkOutDate,
        adults,
        children,
        infants
      );
      return resp;
    } catch (err) {
      console.log("error fetching rooms");
    }
  };

  // Return states and functions for external use
  return {
    reservationData,
    fetchRooms,
    additionalData: {
      reservationTypes,
      reservationStatus,
      reservationSources,
    },
    selectedTab,
    setSelectedTab,
    checkRoomReservationPricing,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
    restoreItem,
    loading,
    paginationDetails,
    setPaginationDetails,
  };
};

export default useRoomReservation;
