import { Card, Col, Row } from "antd";
import CardActions from "./CardActions";
import { getEntityDisplayValue } from "./getEntityDisplayValue";

// Card for pages
const GenericCard = ({
  columns,
  data,
  handleView,
  handleEdit,
  opendeleteRestoreModal,
  privileges,
  loadOneItem,
  showView,
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
    data,
    showView
  );

  return (
    <Card actions={actions} style={{ marginBottom: 16 }}>
      {newColumns.map((column, index) => {
        // Get formatted display value
        const value = getEntityDisplayValue(column.dataIndex, data);

        return (
          <div key={index}>
            <Row>
              <Col span={10}>
                <strong>{column.title}:</strong>
              </Col>
              <Col>{value}</Col>
            </Row>
          </div>
        );
      })}
    </Card>
  );
};

export default GenericCard;
