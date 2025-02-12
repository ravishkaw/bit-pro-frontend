import { Card, Col, Row, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

// Mobile card to view user details
const UserCard = ({ columns, data, handleEdit, openDeleteModal }) => {
  // Filter out the columns
  const newColumns = columns.filter((column) => {
    if (column.title === "Actions") return false; // always filter action column
    return true;
  });

  return (
    <Card
      actions={[
        <EditOutlined
          style={{ color: "#fadb14" }}
          onClick={() => {
            handleEdit(data.id);
          }}
        />,
        <DeleteOutlined
          style={{ color: "red" }}
          onClick={() => openDeleteModal(data)}
        />,
      ]}
      style={{ marginBottom: 10 }}
    >
      {newColumns.map((column, index) => {
        // set data into value
        let value = data[column.dataIndex];

        if (column.dataIndex === "employeeId")
          value = data[column.dataIndex].fullName;

        if (column.dataIndex === "accountStatus")
          value =
            data[column.dataIndex] == 0 ? (
              <Tag color="red">Inactive</Tag>
            ) : (
              <Tag color="green">Active</Tag>
            );

        if (column.dataIndex === "role")
          value = data[column.dataIndex].map((roles, index) => (
            <Tag color="geekblue" key={index}>
              {roles.name}
            </Tag>
          ));

        return (
          <div key={index}>
            <Row>
              <Col span={10}>
                <strong>{column.title}:</strong>
              </Col>
              <Col>{value || "N/A"}</Col>
            </Row>
          </div>
        );
      })}
    </Card>
  );
};

export default UserCard;
