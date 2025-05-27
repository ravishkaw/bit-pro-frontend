import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getReservationsToAStatus,
  roomReservationService,
  roomReservationSourceService,
  roomReservationStatusService,
  roomReservationTypeService,
  getAllGuests,
  getAllChildren,
  guestService,
  childService,
  getAllRoomReservationAmenities,
  updateRoomReservationStatus,
  checkOutRoomReservation,
} from "../../services/roomReservationApiService";
import { fetchAvailableRooms } from "../../services/roomApiServices";
import { getAllRoomPackages } from "../../services/packageApiService";
import {
  paymentMethodService,
  paymentStatusService,
} from "../../services/billingApiService";

import usePagination from "../common/usePagination";
import { mapToSelectOptions } from "../../utils/utils";

// Custom hook to manage room reservation operations
const useRoomReservation = () => {
  const [reservationData, setReservationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("CHECKED-IN");

  const [guests, setGuests] = useState([]);
  const [children, setChildren] = useState([]);
  const [reservationTypes, setReservationTypes] = useState([]);
  const [reservationStatus, setReservationStatus] = useState([]);
  const [reservationSources, setReservationSources] = useState([]);
  const [roomPackages, setRoomPackages] = useState([]);
  const [amenities, setAmenities] = useState([]);

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentStatuses, setPaymentStatuses] = useState([]);

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
      const [
        guests,
        children,
        types,
        status,
        sources,
        roomPackages,
        amenities,
        paymentMethods,
        paymentStatuses,
      ] = await Promise.all([
        getAllGuests(),
        getAllChildren(),
        roomReservationTypeService.getAll(),
        roomReservationStatusService.getAll(),
        roomReservationSourceService.getAll(),
        getAllRoomPackages(),
        getAllRoomReservationAmenities(),
        paymentMethodService.getAll(),
        paymentStatusService.getAll(),
      ]);
      setGuests(guests);
      setChildren(children);
      setReservationTypes(mapToSelectOptions(types));
      setReservationStatus(mapToSelectOptions(status));
      setReservationSources(mapToSelectOptions(sources));
      setRoomPackages(roomPackages);
      setAmenities(amenities);
      setPaymentMethods(mapToSelectOptions(paymentMethods));
      setPaymentStatuses(mapToSelectOptions(paymentStatuses));
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

  // fetch a single item
  const loadOneItem = async (id) => {
    try {
      const item = await roomReservationService.getById(id);
      return item;
    } catch (err) {
      toast.error(err.message || `Failed to loadRoom Reservation details`);
      return null;
    }
  };

  // common function to handle API calls
  const handleApiCall = async (apiCallFn, successMessage) => {
    setLoading(true);
    try {
      await apiCallFn();
      toast.success(successMessage);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      loadRoomReservationData();
      loadReferenceData();
      setLoading(false);
    }
  };

  // Add new item
  const addItem = async (values) => {
    handleApiCall(
      () => roomReservationService.create(values),
      `Room Reservation added successfully`
    );
  };

  // update an item
  const updateItem = async (id, values) => {
    handleApiCall(
      () => roomReservationService.update(id, values),
      `Room Reservation  updated successfully`
    );
  };

  // delete a item
  const deleteItem = async (id) => {
    handleApiCall(
      () => roomReservationService.remove(id),
      `Room Reservation  deleted successfully`
    );
  };

  const addGuest = async (values) => {
    handleApiCall(
      () => guestService.create(values),
      `Guest added successfully`
    );
  };

  const addChild = async (values) => {
    handleApiCall(
      () => childService.create(values),
      `Child added successfully`
    );
  };

  const handleActionItem = async (id, actionType) => {
    setLoading(true);
    try {
      await updateRoomReservationStatus(id, actionType);
      toast.success(`Room Reservation ${actionType} successfully`);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      loadRoomReservationData();
      loadReferenceData();
      setLoading(false);
    }
  };

  // const handle check out
  const roomCheckout = async (id, values) => {
    setLoading(true);
    try {
      const resp = await checkOutRoomReservation(id, values);
      toast.success(`Room Reservation checked out successfully`);
      return resp;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      loadRoomReservationData();
      loadReferenceData();
      setLoading(false);
    }
  };

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
      guests,
      children,
      reservationTypes,
      reservationStatus,
      reservationSources,
      addChild,
      addGuest,
      roomPackages,
      amenities,
      paymentMethods,
      paymentStatuses,
      loadReferenceData,
    },
    selectedTab,
    setSelectedTab,
    handleActionItem,
    roomCheckout,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
    loading,
    paginationDetails,
    setPaginationDetails,
  };
};

export default useRoomReservation;
