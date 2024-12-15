import { Button, Space, Popconfirm } from "antd";

export const guestColumns = (openModal, deleteGuestRecord) => [
  {
    title: "Guest ID",
    dataIndex: "guestId",
    fixed: "left",
    key: "guestId",
  },
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
    fixed: "left",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title: "NIC Number",
    dataIndex: "nic",
    key: "nic",
    fixed: "left",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Nationality",
    dataIndex: "nationality",
    key: "nationality",
  },
  {
    title: "Date of Birth",
    dataIndex: "dob",
    key: "dob",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Emergency Contact",
    dataIndex: "emergencyContact",
    key: "emergencyContact",
  },
  {
    title: "Status",
    dataIndex: "deleted",
    key: "deleted",
    render: (deleted) => (deleted ? "Deleted" : "Active"),
  },
  {
    title: "Actions",
    key: "operation",
    fixed: "right",
    render: (_, record) => (
      <Space>
        <Button
          size="small"
          disabled={record.deleted}
          onClick={() => openModal(true, record)}
        >
          Edit
        </Button>

        <Popconfirm
          title="Delete the guest"
          description="Are you sure to delete this guest?"
          onConfirm={() => deleteGuestRecord(record.guestId)}
          okText="Yes"
          okButtonProps={{ danger: true }}
          cancelText="No"
          disabled={record.deleted}
        >
          <Button size="small" danger disabled={record.deleted}>
            Delete
          </Button>
        </Popconfirm>
      </Space>
    ),
  },
];
