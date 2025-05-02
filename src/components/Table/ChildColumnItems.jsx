import TableActions from "./TableActions";

// Column items for the Child table
export const childColumnItems = (
  modulePrivileges,
  handleEdit,
  loadOneItem,
  handleView,
  opendeleteRestoreModal
) => [
  {
    title: "Full Name",
    dataIndex: "fullName",
    sorter: true,
    fixed: "left",
  },
  {
    title: "Date of Birth",
    dataIndex: "dob",
    sorter: true,
  },
  {
    title: "Guest",
    dataIndex: "guestFullName",
    sorter: true,
  },
  {
    title: "Nationality",
    dataIndex: "nationalityName",
    sorter: true,
  },
  {
    title: "Gender",
    dataIndex: "genderName",
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
        handleView={handleView}
        opendeleteRestoreModal={opendeleteRestoreModal}
      />
    ),
  },
];
