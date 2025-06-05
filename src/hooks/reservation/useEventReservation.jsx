import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getReservationsToAStatus,
  eventReservationService,
  eventStatusService,
  eventTypeService,
  getAllEventReservationServices,
  fetchAllEventVenues,
  updateEventReservationStatus,
  checkOutEventReservation,
} from "../../services/eventReservationApiService";
import {
  getAllGuests,
  guestService,
} from "../../services/roomReservationApiService";
import { getAllEventPackages } from "../../services/packageApiService";
import {
  paymentMethodService,
  paymentStatusService,
} from "../../services/billingApiService";

import usePagination from "../common/usePagination";
import { mapToSelectOptions } from "../../utils/utils";

// Custom hook to manage event reservation operations
const useEventReservation = () => {
  const [reservationData, setReservationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Checked-In");
  const [guests, setGuests] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [eventVenues, setEventVenues] = useState([]);
  const [eventStatus, setEventStatus] = useState([]);
  const [eventPackages, setEventPackages] = useState([]);
  const [services, setServices] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentStatuses, setPaymentStatuses] = useState([]);
  const { paginationDetails, setPaginationDetails } = usePagination();

  // load event reservation data depending on the selected tab
  const loadEventReservationData = async () => {
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
      console.error("Error loading event reservation data:", error);
      setLoading(false);
    }
  };
  // load reference data for event reservation
  const loadReferenceData = async () => {
    try {
      const [
        guests,
        eventTypes,
        eventVenues,
        eventStatus,
        eventPackages,
        services,
        paymentMethods,
        paymentStatuses,
      ] = await Promise.all([
        getAllGuests(),
        eventTypeService.getAll(),
        fetchAllEventVenues(),
        eventStatusService.getAll(),
        getAllEventPackages(),
        getAllEventReservationServices(),
        paymentMethodService.getAll(),
        paymentStatusService.getAll(),
      ]);
      setGuests(guests);
      setEventTypes(mapToSelectOptions(eventTypes));
      setEventVenues(mapToSelectOptions(eventVenues));
      setEventStatus(mapToSelectOptions(eventStatus));
      setEventPackages(mapToSelectOptions(eventPackages));
      setServices(mapToSelectOptions(services));
      setPaymentMethods(mapToSelectOptions(paymentMethods));
      setPaymentStatuses(mapToSelectOptions(paymentStatuses));
    } catch (error) {
      console.error("Error loading reference data:", error);
    }
  };
  // Load event reservation data when the component mounts
  useEffect(() => {
    loadEventReservationData();
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
      const item = await eventReservationService.getById(id);
      return item;
    } catch (err) {
      toast.error(err.message || `Failed to loadEvent Reservation details`);
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
      loadEventReservationData();
      loadReferenceData();
      setLoading(false);
    }
  };
  // Add new item
  const addItem = async (values) => {
    handleApiCall(
      () => eventReservationService.create(values),
      `Event Reservation added successfully`
    );
  };
  // update an item
  const updateItem = async (id, values) => {
    handleApiCall(
      () => eventReservationService.update(id, values),
      `Event Reservation  updated successfully`
    );
  };
  // delete a item
  const deleteItem = async (id) => {
    handleApiCall(
      () => eventReservationService.remove(id),
      `Event Reservation  deleted successfully`
    );
  };
  const addGuest = async (values) => {
    handleApiCall(
      () => guestService.create(values),
      `Guest added successfully`
    );
  };

  const handleActionItem = async (id, actionType) => {
    setLoading(true);
    try {
      await updateEventReservationStatus(id, actionType);
      toast.success(`Event Reservation ${actionType} successfully`);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      loadEventReservationData();
      loadReferenceData();
      setLoading(false);
    }
  };
  // const handle check out
  const eventCheckout = async (id, values) => {
    setLoading(true);
    try {
      await checkOutEventReservation(id, values);
      toast.success(`Event Reservation checked out successfully`);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      loadEventReservationData();
      loadReferenceData();
      setLoading(false);
    }
  };
  // get available events for a time period
  const fetchEvents = async (
    checkInDate,
    checkOutDate,
    adults,
    children,
    infants
  ) => {
    try {
      const resp = await fetchAvailableEvents(
        checkInDate,
        checkOutDate,
        adults,
        children,
        infants
      );
      return resp;
    } catch (err) {
      console.log("error fetching events");
    }
  };
  // Return states and functions for external use
  return {
    reservationData,
    fetchEvents,
    additionalData: {
      guests,
      eventTypes,
      eventVenues,
      eventStatus,
      services,
      addGuest,
      eventPackages,
      paymentMethods,
      paymentStatuses,
      loadReferenceData,
    },
    selectedTab,
    setSelectedTab,
    handleActionItem,
    eventCheckout,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
    loading,
    paginationDetails,
    setPaginationDetails,
  };
};

export default useEventReservation;
