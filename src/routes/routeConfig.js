// Import page components
import Dashboard from "../pages/Dashboard";
import {
  EventReservation,
  EventReservationServices,
  RoomReservation,
  RoomReservationAmenities,
} from "../pages/Reservation";
import ManageUsers from "../pages/System/ManageUsers";
import ManagePrivileges from "../pages/System/ManagePrivileges";
import {
  ManageRooms,
  RoomFacility,
  RoomInventory,
  RoomTypes,
} from "../pages/Rooms";
import Inventory from "../pages/Inventory/Inventory";
import ManagePackages from "../pages/Packages/ManagePackages";
import ManageBillings from "../pages/Billing/ManageBillings";
import EventVenue from "../pages/Events/EventVenue";
import ManageTasks from "../pages/Tasks/ManageTasks";
import ManagePreventiveMaintenance from "../pages/Tasks/ManagePreventiveMaintenance";
import {
  ManageChildren,
  ManageGuests,
  ManageEmployees,
  UserProfile,
} from "../pages/Profile";

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
    element: ManageEmployees,
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
  {
    path: "/children",
    element: ManageChildren,
    module: "Child",
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
    path: "/room-facilities",
    element: RoomFacility,
    module: "Room Facility",
  },
  {
    path: "/room-inventory",
    element: RoomInventory,
    module: "Room Inventory",
  },
  // Events Routes
  {
    path: "/event-venues",
    element: EventVenue,
    module: "Event Venue",
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
  // Task and maintenance Routes
  {
    path: "/tasks",
    element: ManageTasks,
    module: "Task",
  },
  {
    path: "/preventive-maintenance",
    element: ManagePreventiveMaintenance,
    module: "Task",
  },
  // Billing Routes
  {
    path: "/billings",
    element: ManageBillings,
    module: "Billing",
  },
];
