import { createApiService } from "./apiService";
import axiosInstance from "./axiosInstance";

// events
const EVENT_RESERVATION_BASE_URL = "/event-reservations";
const EVENT_RESERVATION_SERVICE_URL = "/event-services";
const EVENT_VENUE_URL = "/event-venues";
const EVENT_TYPE_URL = "/event-types";
const EVENT_STATUS_URL = "/event-status";

// Generic API service for event reservations
export const eventReservationService = createApiService(
  EVENT_RESERVATION_BASE_URL
);

// Generic API service for event reservations
export const getReservationsToAStatus = async (params) => {
  const response = await axiosInstance.get(EVENT_RESERVATION_BASE_URL, {
    params: {
      pageNumber: params.pageNumber,
      pageSize: params.pageSize,
      sortBy: params.sortBy,
      sortOrder: params.sortOrder === "descend" ? "desc" : "asc",
      searchQuery: params.searchQuery,
      status: params.status,
    },
  });
  return response.data;
};

// Generic API service for event venues
export const eventVenueService = createApiService(EVENT_VENUE_URL);

// Fetch all event venues
export const fetchAllEventVenues = async () => {
  const response = await axiosInstance.get(`${EVENT_VENUE_URL}/get-all`);
  return response.data;
};

// Generic API service for event reservation services
export const eventReservationServiceService = createApiService(
  EVENT_RESERVATION_SERVICE_URL
);

// Generic API service for event status
export const eventStatusService = createApiService(EVENT_STATUS_URL);

// Generic API service for event type
export const eventTypeService = createApiService(EVENT_TYPE_URL);

// Get all event reservation services without pagination and sorting
export const getAllEventReservationServices = async () => {
  const response = await axiosInstance.get(
    `${EVENT_RESERVATION_SERVICE_URL}/get-all`
  );
  return response.data;
};

// pricing calculation for event reservation
export const checkEventReservationPricing = async (params) => {
  const requestData = {
    eventId: params.eventId,
    checkInDate: params.checkInDate,
    checkOutDate: params.checkOutDate,
    services: params.services,
    eventPackageId: params.eventPackageId,
    taxId: [1],
  };
  const response = await axiosInstance.post(
    `${EVENT_RESERVATION_BASE_URL}/calculate-pricing`,
    requestData
  );

  return response.data;
};
// update event reservation status ( actions in table )
export const updateEventReservationStatus = async (id, actionType) => {
  const response = await axiosInstance.put(
    `${EVENT_RESERVATION_BASE_URL}/${id}/${actionType}`
  );
  return response.data;
};

// handle check out
export const checkOutEventReservation = async (id, values) => {
  const response = await axiosInstance.put(
    `${EVENT_RESERVATION_BASE_URL}/${id}/check-out`,
    values
  );
  return response.data;
};
