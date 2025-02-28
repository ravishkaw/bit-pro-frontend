import { Card, Col, Row, Tag } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

// Card for pages
const GenericCard = ({
  columns,
  data,
  handleView,
  handleEdit,
  openDeleteModal,
  object,
  apiFunction,
  showViewAction = false,
  showEditAction = true,
  showDeleteAction = true,
}) => {
  // Filter out the columns
  const newColumns = columns.filter((column) => {
    if (column.title === "Actions") return false; // always filter action column
    if (object !== "employee") {
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

  // Define the actions based on the props
  const actions = [];
  if (showViewAction || object == "employee") {
    actions.push(
      <EyeOutlined
        style={{ color: "blue" }}
        onClick={() => {
          handleView(apiFunction, data.id);
        }}
      />
    );
  }
  if (showEditAction) {
    actions.push(
      <EditOutlined
        style={{ color: "#fadb14" }}
        onClick={() => {
          handleEdit(apiFunction, data.id);
        }}
      />
    );
  }
  if (showDeleteAction) {
    actions.push(
      <DeleteOutlined
        style={{ color: "red" }}
        onClick={() => openDeleteModal(data)}
      />
    );
  }

  return (
    <Card actions={actions} style={{ marginBottom: 10 }}>
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

        if (
          column.dataIndex === "designation" ||
          column.dataIndex === "employeeStatus" ||
          column.dataIndex === "moduleId" ||
          column.dataIndex === "roleId"
        ) {
          value = data[column.dataIndex].name; // designation :{id:1, name:"admin"}
        }

        if (
          column.dataIndex === "selectOp" ||
          column.dataIndex === "insertOp" ||
          column.dataIndex === "updateOp" ||
          column.dataIndex === "deleteOp"
        ) {
          value =
            data[column.dataIndex] == 0 ? (
              <Tag color="red">Not Granted</Tag>
            ) : (
              <Tag color="green">Granted</Tag>
            );
        }
        if (column.dataIndex === "roomType") {
          value = data[column.dataIndex].name; // roomType :{id:1, name:"single", basePrice:200}
        }

        if (column.dataIndex === "isDeleted")
          value =
            data[column.dataIndex] == 0 ? (
              <Tag color="green">Active</Tag>
            ) : (
              <Tag color="red">Deleted</Tag>
            );

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

export default GenericCard;
