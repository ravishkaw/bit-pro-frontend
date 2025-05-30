import { Tag } from "antd";
import TableActions from "./TableActions";

// Column items for the Guest table
export const guestColumnItems = (
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
    sorter: true,
  },
  {
    title: "Status",
    dataIndex: "statusName",
    render: (_, record) =>
      record?.statusName == "Active" ? (
        <Tag color="green">Active</Tag>
      ) : (
        <Tag color="red">Deleted</Tag>
      ),
    sorter: true,
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
        opendeleteRestoreModal={opendeleteRestoreModal}
        isDeleted={record?.statusName == "Deleted"}
      />
    ),
  },
];
