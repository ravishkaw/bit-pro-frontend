import { Card, Col, Row } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

const ProfileCard = ({
  personType,
  columns,
  data,
  handleView,
  handleEdit,
  openDeleteModal,
  restorePerson,
}) => {
  // Filter out the columns
  const newColumns = columns.filter((column) => {
    if (column.title === "Actions") return false; // Always remove the "Actions" column
    if (personType !== "employee") {
      // Remove employee-specific columns
      if (
        column.dataIndex === "designation" ||
        column.dataIndex === "employeeStatus" ||
        column.dataIndex === "empNo"
      ) {
        return false;
      }
    }
    return true;
  });

  return (
    <Card
      actions={[
        <EyeOutlined
          style={{ color: "blue" }}
          onClick={() => {
            handleView(data.id);
          }}
        />,
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
        let value = data[column.dataIndex];
        if (
          column.dataIndex === "designation" ||
          column.dataIndex === "employeeStatus"
        ) {
          value = data[column.dataIndex].name;
        }

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

export default ProfileCard;
