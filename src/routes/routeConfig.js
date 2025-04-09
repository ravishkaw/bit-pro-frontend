// Import page components
import Dashboard from "../pages/Dashboard";
import UserProfile from "../pages/UserProfile";
import ManageEmployee from "../pages/ManageEmployees";
import { ManageGuests, RoomReservation } from "../pages/Reservation";
import ManageUsers from "../pages/ManageUsers";
import ManagePrivileges from "../pages/ManagePrivileges";
import {
  ManageRooms,
  RoomFacilities,
  RoomInventory,
  RoomTypes,
} from "../pages/Rooms";
import Inventory from "../pages/Inventory/Inventory";

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

  // Room and reservation Management Routes
  {
    path: "/room-reservations",
    element: RoomReservation,
    module: "Room Reservation",
  },
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
    element: RoomFacilities,
    module: "Room Facility",
  },
  {
    path: "/room-inventory",
    element: RoomInventory,
    module: "Room Inventory",
  },

  // Inventory Routes
  {
    path: "/inventory",
    element: Inventory,
    module: "Inventory",
  },
];
