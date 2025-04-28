import { render } from "react-dom";
import TableActions from "./TableActions";

// Create table columns with permission-based edit/delete actions
export const RoomReservationColumnItems = (
  modulePrivileges,
  handleEdit,
  loadOneItem,
  handleView,
  opendeleteRestoreModal
) => [
  {
    title: "Guest(s)",
    dataIndex: "guests",
    sorter: true,
    fixed: "left",
  },
  {
    title: "Total Guest(s)",
    dataIndex: "totalGuests",
    render: (_, record) => {
      const adults = record.adultNo || 0;
      const children = record.childNo || 0;
      const infants = record.infantNo || 0;
      return adults + children + infants;
    },
  },
  {
    title: "Room Number",
    dataIndex: "roomNumber",
    sorter: true,
  },
  {
    title: "Check-In",
    dataIndex: "checkInDate",
    sorter: true,
    render: (_, record) => record.checkInDate || record.reservedCheckinDate,
  },
  {
    title: "Check-Out",
    dataIndex: "checkOutDate",
    sorter: true,
    render: (_, record) => record.checkOutDate || record.reservedCheckoutDate,
  },
  {
    title: "Total Price",
    dataIndex: "totalPrice",
    sorter: true,
    render: (_, record) => {
      const totalPrice = record.totalPrice || 0;
      return `${totalPrice.toLocaleString("en-LK", {
        style: "currency",
        currency: "LKR",
      })}`;
    },
  },
  {
    title: "Payment Status",
    dataIndex: "paymentStatusName",
    sorter: true,
  },
  {
    title: "Actions",
    key: "operation",
    fixed: "right",
    align: "center",
    render: (_, record) => (
      <TableActions
        modulePrivilege={modulePrivileges}
        apiFunction={loadOneItem}
        record={record}
        handleEdit={handleEdit}
        opendeleteRestoreModal={opendeleteRestoreModal}
        isDeleted={record?.statusName === "Deleted"}
      />
    ),
  },
];
