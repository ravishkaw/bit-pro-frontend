import { Card, Col, Row, Tag } from "antd";

import CardActions from "./CardActions";

// Card for pages
const GenericCard = ({
  columns,
  data,
  handleView,
  handleEdit,
  opendeleteRestoreModal,
  privileges,
  loadOneItem,
}) => {
  // Filter out the columns
  const newColumns = columns.filter((column) => {
    if (column.title === "Actions") return false; // always filter action column
    return true;
  });

  const { actions } = CardActions(
    handleView,
    handleEdit,
    opendeleteRestoreModal,
    privileges,
    loadOneItem,
    data
  );

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
    <Card variant="borderless" actions={actions} style={{ marginBottom: 16 }}>
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

        if (
          column.dataIndex === "designation" ||
          column.dataIndex === "employeeStatus" ||
          column.dataIndex === "module" ||
          column.dataIndex === "role"
        ) {
          // ! bugs
          // value = data[column.dataIndex].label; // designation :{id:1, name:"admin"}

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
