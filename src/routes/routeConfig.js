// Import page components
import Dashboard from "../pages/Dashboard";
import UserProfile from "../pages/Profile/UserProfile";
import ManageEmployee from "../pages/Profile/ManageEmployees";
import ManageGuests from "../pages/Profile/ManageGuests";
import {
  EventReservation,
  EventReservationServices,
  RoomReservation,
  RoomReservationAmenities,
} from "../pages/Reservation";
import ManageUsers from "../pages/System/ManageUsers";
import ManagePrivileges from "../pages/System/ManagePrivileges";
import { ManageRooms, RoomInventory, RoomTypes } from "../pages/Rooms";
import Inventory from "../pages/Inventory/Inventory";
import ManagePackages from "../pages/Packages/ManagePackages";
import ManageBillings from "../pages/Billing/ManageBillings";

//Route Configuration
export const protectedRoutes = [
  // Dashboard & Profile Routes
  {
    path: "/dashboard",
    element: Dashboard,
    module: null, // No access check required
  },
  {
    path: "/user-profile",
    element: UserProfile,
    module: null,
  },

  // User Management Routes
  {
    path: "/employees",
    element: ManageEmployee,
    module: "Employee",
  },
  {
    path: "/users",
    element: ManageUsers,
    module: "User",
  },
  {
    path: "/privileges",
    element: ManagePrivileges,
    module: "Privilege",
  },

  // Guests Route
  {
    path: "/guests",
    element: ManageGuests,
    module: "Guest",
  },

  // Reservation Management Routes
  {
    path: "/room-reservations",
    element: RoomReservation,
    module: "Room Reservation",
  },
  {
    path: "/room-reservation-amenities",
    element: RoomReservationAmenities,
    module: "Room Reservation Amenity",
  },
  {
    path: "/event-reservations",
    element: EventReservation,
    module: "Event Reservation",
  },
  {
    path: "/event-reservation-services",
    element: EventReservationServices,
    module: "Event Reservation Service",
  },
  // Room Routes
  {
    path: "/rooms",
    element: ManageRooms,
    module: "Room",
  },
  {
    path: "/room-types",
    element: RoomTypes,
    module: "Room Type",
  },
  {
    path: "/room-inventory",
    element: RoomInventory,
    module: "Room Inventory",
  },

  // Package Routes
  {
    path: "/packages",
    element: ManagePackages,
    module: "Package",
  },
  // Inventory Routes
  {
    path: "/inventory",
    element: Inventory,
    module: "Inventory",
  },
  // Billing Routes
  {
    path: "/billings",
    element: ManageBillings,
    module: "Billing",
  },
];
