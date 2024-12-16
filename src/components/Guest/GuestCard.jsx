import dayjs from "dayjs";
import { Card, Button, Space, Col, Row } from "antd";

const GuestCard = ({ columns, data, openModal, deleteGuestRecord }) => {
  return (
    <Card style={{ marginBottom: "16px" }}>
      {columns.map((column) => {
        let value = data[column.dataIndex];
        if (column.dataIndex === "deleted") {
          value = value ? "Deleted" : "Active";
        } else if (column.key === "operation") {
          const formattedGuest = {
            ...data,
            dob: dayjs(data.dob, "YYYY-MM-DD"),
          };
          value = (
            <Space>
              <Button
                size="small"
                onClick={() => openModal(true, formattedGuest)}
              >
                Edit
              </Button>
              <Button
                size="small"
                danger
                onClick={() => deleteGuestRecord(formattedGuest.guestId)}
              >
                Delete
              </Button>
            </Space>
          );
        }

        return (
          <>
            <Row key={column.key}>
              <Col span={10}>
                <strong>{column.title}:</strong>
              </Col>
              <Col>{value || "N/A"}</Col>
            </Row>
          </>
        );
      })}
    </Card>
  );
};
export default GuestCard;
