import { Card, Col, Row } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

const ManageEmployeeCard = ({ loading, columns, employee, handleView }) => {
  const newColumns = columns.filter((column) => column.title !== "Actions");

  return (
    <Card
      loading={loading}
      actions={[
        <EyeOutlined
          onClick={() => {
            handleView();
          }}
        />,
        <DeleteOutlined style={{ color: "red" }} />,
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
