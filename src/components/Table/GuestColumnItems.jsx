import TableActions from "./TableActions";

// Column items for the Guest table
export const guestColumnItems = (
  modulePrivileges,
  openDeleteModal,
  handleEdit,
  loadOneItem,
  handleView
) => [
  {
    title: "Full Name",
    dataIndex: "fullName",
    sorter: true,
    fixed: "left",
  },
  {
    title: "Calling Name",
    dataIndex: "callingName",
    sorter: true,
  },
  {
    title: "Phone",
    dataIndex: "mobileNo",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Nationality",
    dataIndex: "nationalityName",
  },
  {
    title: "Actions",
    key: "operation",
    fixed: "right",
    render: (_, record) => (
      <TableActions
        modulePrivilege={modulePrivileges}
        apiFunction={loadOneItem}
        record={record}
        handleEdit={handleEdit}
        handleView={handleView}
        showView={true}
        openDeleteModal={openDeleteModal}
      />
    ),
  },
];
