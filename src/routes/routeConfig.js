// Import page components
import Dashboard from "../pages/Dashboard";
import UserProfile from "../pages/UserProfile";
import ManageEmployee from "../pages/ManageEmployees";
import ManageGuests from "../pages/ManageGuests";
import ManageUsers from "../pages/ManageUsers";
import ManagePrivileges from "../pages/ManagePrivileges";
import {
  ManageRooms,
  RoomAmenities,
  RoomInventory,
  RoomPricingRules,
  RoomReservation,
  RoomTypes,
} from "../pages/RoomAndReservation";

//Route Configuration
//module: null - No access check required
//module: "ModuleName" - Requires specific module access / privileges
export const protectedRoutes = [
  // Dashboard & Profile Routes
  {
    path: "/dashboard",
    element: Dashboard,
    module: null,
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
    path: "/amenities",
    element: RoomAmenities,
    module: "Amenity",
  },
  {
    path: "/room-inventory",
    element: RoomInventory,
    module: "Room Inventory",
  },
  {
    path: "/room-pricing-rules",
    element: RoomPricingRules,
    module: "Room Pricing Rule",
  },
];
