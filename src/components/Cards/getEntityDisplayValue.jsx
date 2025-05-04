import { Tag } from "antd";

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

//Returns formatted display value based on the data field
export const getEntityDisplayValue = (dataIndex, data) => {
  if (!data || !dataIndex) return "N/A";

  let value = data[dataIndex];

  // Handle different data indexes
  switch (dataIndex) {
    case "employeeId":
      return data[dataIndex]?.fullName || "N/A";

    case "status":
      const statusValue =
        data[dataIndex] === "Deleted" ||
        (data[dataIndex] && data[dataIndex].name === "Deleted")
          ? "Inactive"
          : "Active";
      return <Tag color={tagColors[statusValue]}>{statusValue}</Tag>;

    case "designation":
      return value || "N/A";

    case "module":
      return value || "N/A";

    case "role":
      return value || "N/A";

    case "employeeStatusName":
      if (tagColors[value]) {
        return <Tag color={tagColors[value]}>{value}</Tag>;
      }
      return value || "N/A";

    case "selectOp":
    case "insertOp":
    case "updateOp":
    case "deleteOp":
      const opStatus = data[dataIndex] == 0 ? "Not Granted" : "Granted";
      return <Tag color={tagColors[opStatus]}>{opStatus}</Tag>;

    case "roomType":
      return data[dataIndex]?.name || "N/A";

    case "statusName":
      if (tagColors[value]) {
        return <Tag color={tagColors[value]}>{value}</Tag>;
      }
      return value || "N/A";

    case "inventory":
      return data[dataIndex]?.itemName || "N/A";

    case "room":
      return data[dataIndex]?.roomNumber || "N/A";

    default:
      return value || "N/A";
  }
};
