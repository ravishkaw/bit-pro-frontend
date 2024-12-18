import dayjs from "dayjs";
import { Card, Button, Space, Col, Row, Popconfirm } from "antd";

const GuestCard = ({ columns, data, openModal, deleteGuestRecord }) => {
  return (
    <Card style={{ marginBottom: "16px", overflow: "auto" }}>
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
              {!formattedGuest.deleted ? (
                <>
                  <Button
                    size="small"
                    onClick={() => openModal(true, formattedGuest)}
                    disabled={formattedGuest.deleted}
                  >
                    Edit
                  </Button>

                  <Popconfirm
                    title="Delete the guest"
                    description="Are you sure to delete this guest?"
                    onConfirm={() => deleteGuestRecord(formattedGuest.guestId)}
                    okText="Yes"
                    okButtonProps={{ danger: true }}
                    cancelText="No"
                    disabled={formattedGuest.deleted}
                  >
                    <Button size="small" danger>
                      Delete
                    </Button>
                  </Popconfirm>
                </>
              ) : (
                <Popconfirm
                  title="Restore the guest"
                  description="Not implemented"
                  // onConfirm={() => deleteGuestRecord(record.guestId)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button size="small" color="default" variant="dashed">
                    Restore
                  </Button>
                </Popconfirm>
              )}
            </Space>
          );
        }

        return (
          <div key={column.key}>
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
export default GuestCard;
