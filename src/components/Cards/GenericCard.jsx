import { Card, Col, Row, Tag } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

// Card for pages
const GenericCard = ({
  columns,
  data,
  handleView,
  handleEdit,
  openDeleteModal,
  module,
  loadOneItem,
  showViewAction = false,
  showEditAction = true,
  showDeleteAction = true,
}) => {
  // Filter out the columns
  const newColumns = columns.filter((column) => {
    if (column.title === "Actions") return false; // always filter action column
    return true;
  });

  // define modules can view
  if (module == "Employee" || module == "Guest") showViewAction = true;

  // Define the actions based on the props
  const actions = [];
  if (showViewAction) {
    actions.push(
      <EyeOutlined
        style={{ color: "blue" }}
        onClick={() => handleView(loadOneItem, data.id)}
      />
    );
  }
  if (showEditAction) {
    actions.push(
      <EditOutlined
        style={{ color: "#fadb14" }}
        onClick={() => handleEdit(loadOneItem, data.id)}
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

  // Tag colors
  const tagColors = {
    Active: "green",
    Resigned: "red",
    "On Leave": "orange",
    Deleted: "gray",
    Inactive: "red",
    Granted: "green",
    "Not Granted": "red",
    "In Stock": "green",
    "Out of Stock": "red",
    "Low Stock": "orange",
    Reserved: "yellow",
    Damaged: "grey",
    Disposed: "geekblue",
  };

  return (
    <Card actions={actions} style={{ marginBottom: 10 }}>
      {newColumns.map((column, index) => {
        // set data into value
        let value = data[column.dataIndex];

        if (column.dataIndex === "employeeId")
          value = data[column.dataIndex].fullName;

        if (column.dataIndex === "status") {
          const statusValue =
            data[column.dataIndex] == "Deleted" ||
            (data[column.dataIndex] && data[column.dataIndex].name == "Deleted")
              ? "Inactive"
              : "Active";
          value = <Tag color={tagColors[statusValue]}>{statusValue}</Tag>;
        }

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

          // Apply tag colors to employeeStatus
          if (column.dataIndex === "employeeStatus" && tagColors[value]) {
            value = <Tag color={tagColors[value]}>{value}</Tag>;
          }
        }

        if (
          column.dataIndex === "selectOp" ||
          column.dataIndex === "insertOp" ||
          column.dataIndex === "updateOp" ||
          column.dataIndex === "deleteOp"
        ) {
          const opStatus =
            data[column.dataIndex] == 0 ? "Not Granted" : "Granted";
          value = <Tag color={tagColors[opStatus]}>{opStatus}</Tag>;
        }

        if (column.dataIndex === "roomType") {
          value = data[column.dataIndex].name;
        }

        if (column.dataIndex === "statusName") {
          value = data[column.dataIndex];

          // Apply tag colors to various statusNames
          if (column.dataIndex === "statusName" && tagColors[value]) {
            value = <Tag color={tagColors[value]}>{value}</Tag>;
          }
        }

        if (column.dataIndex === "inventory") {
          value = data[column.dataIndex].itemName;
        }

        if (column.dataIndex === "room") {
          value = data[column.dataIndex].roomNumber;
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

export default GenericCard;
