import { useEffect, useState } from "react";

import {
  getReservationsToAStatus,
  roomReservationService,
  roomReservationStatusService,
  roomReservationTypeService,
} from "../../services/reservationApiService";
import useCrudHandler from "../common/useCrudHandler";

import { mapToSelectOptions } from "../../utils/utils";
import usePagination from "../common/usePagination";

// Custom hook to manage room reservation operations
const useRoomReservation = () => {
  const [reservationData, setReservationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Checked-In");
  const [reservationTypes, setReservationTypes] = useState([]);
  const [reservationStatus, setReservationStatus] = useState([]);

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
      const [types, status] = await Promise.all([
        roomReservationTypeService.getAll(),
        roomReservationStatusService.getAll(),
      ]);
      setReservationTypes(mapToSelectOptions(types));
      setReservationStatus(mapToSelectOptions(status));
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

  // Return states and functions for external use
  return {
    reservationData,
    additionalData: { reservationTypes, reservationStatus },
    selectedTab,
    setSelectedTab,
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
