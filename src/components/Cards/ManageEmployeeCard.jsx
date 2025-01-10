import { Card, Col, Row, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

const ManageEmployeeCard = ({
  columns,
  employee,
  handleView,
  openDeleteModal,
}) => {
  const newColumns = columns.filter((column) => column.title !== "Actions");

  return (
    <Card
      actions={[
        <EditOutlined
          onClick={() => {
            handleView(employee.employeeId);
          }}
        />,
        <DeleteOutlined
          style={{ color: "red" }}
          onClick={() => openDeleteModal(employee)}
        />,
      ]}
      style={{ marginBottom: 10 }}
    >
      {newColumns.map((column, index) => {
        let value = employee[column.dataIndex];
        if (
          column.dataIndex == "designation" ||
          column.dataIndex == "employeeStatus"
        ) {
          value = employee[column.dataIndex].name;
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
export default ManageEmployeeCard;
