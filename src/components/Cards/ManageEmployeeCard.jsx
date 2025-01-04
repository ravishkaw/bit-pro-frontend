import { Card, Col, Row, Popconfirm } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";

const ManageEmployeeCard = ({
  loading,
  columns,
  employee,
  handleView,
  deleteAnEmployee,
}) => {
  const newColumns = columns.filter((column) => column.title !== "Actions");

  return (
    <Card
      loading={loading}
      actions={[
        <EyeOutlined
          onClick={() => {
            handleView(employee.employeeId);
          }}
        />,
        <Popconfirm
          title="Delete the Employee"
          description="Are you sure to delete this Employee?"
          onConfirm={() => deleteAnEmployee(employee.employeeId)}
          okText="Delete"
          cancelText="No"
          okButtonProps={{ danger: true }}
        >
          <DeleteOutlined style={{ color: "red" }} />,
        </Popconfirm>,
      ]}
      style={{ marginBottom: 10 }}
    >
      {newColumns.map((column, index) => {
        let value = employee[column.dataIndex];
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
