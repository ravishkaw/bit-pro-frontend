import { Row, Col, Card, Flex, Statistic, Button, Badge } from "antd";
import {
  ToolOutlined,
  HomeFilled,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const RoomStatistics = ({
  rooms,
  openModal,
  roomFacilityhookData,
  openMaintenanceModal,
  openHousekeepingModal,
}) => {
  // Calculate room status counts
  const availableRooms =
    rooms?.filter((room) => room.status_id === 1)?.length || 0;
  const occupiedRooms =
    rooms?.filter((room) => room.status_id === 2)?.length || 0;

  // Maintenance and housekeeping counts would come from their respective data sources
  // Using placeholder values for now
  const maintenanceCount = 3; // Replace with actual data
  const housekeepingCount = 5; // Replace with actual data

  return (
    <Row gutter={[16, 16]}>
      <Col lg={6} xs={12}>
        <Card
          className="stat-card"
          style={{
            height: "100%",
            borderRadius: "8px",
            borderLeft: "4px solid #666cff",
          }}
          styles={{ body: { padding: "16px" } }}
        >
          <Flex align="center" justify="space-between" wrap>
            <Statistic
              title={
                <span style={{ fontSize: "15px", fontWeight: "600" }}>
                  Total Rooms
                </span>
              }
              value={rooms?.length || 0}
              valueStyle={{ color: "#666cff" }}
              prefix={<HomeFilled style={{ marginRight: "8px" }} />}
            />
            <Flex align="start" vertical>
              <Badge color="#52c41a" text={`${availableRooms} Available`} />
              <Badge color="#f5222d" text={`${occupiedRooms} Occupied`} />
            </Flex>
          </Flex>
        </Card>
      </Col>

      <Col lg={6} xs={12}>
        <Card
          className="stat-card"
          style={{
            height: "100%",
            borderRadius: "8px",
            borderLeft: "4px solid #666cff",
          }}
          styles={{ body: { padding: "16px" } }}
        >
          <Statistic
            title={
              <Flex justify="space-between" wrap>
                <span style={{ fontSize: "15px", fontWeight: "600" }}>
                  Room Facilities
                </span>
                <Button
                  type="primary"
                  size="small"
                  onClick={openModal}
                  style={{
                    backgroundColor: "#666cff",
                    borderColor: "#666cff",
                  }}
                >
                  Manage
                </Button>
              </Flex>
            }
            value={roomFacilityhookData?.data?.length || 0}
            valueStyle={{ color: "#666cff" }}
            prefix={<CheckCircleOutlined style={{ marginRight: "8px" }} />}
          />
        </Card>
      </Col>

      <Col lg={6} xs={12}>
        <Card
          className="stat-card"
          style={{
            height: "100%",
            borderRadius: "8px",
            borderLeft: "4px solid #666cff",
          }}
          styles={{ body: { padding: "16px" } }}
        >
          <Statistic
            title={
              <Flex justify="space-between" wrap>
                <span style={{ fontSize: "15px", fontWeight: "600" }}>
                  Periodic Maintenance
                </span>
                <Button
                  type="primary"
                  size="small"
                  onClick={openMaintenanceModal}
                  style={{
                    backgroundColor: "#666cff",
                    borderColor: "#666cff",
                  }}
                >
                  Manage
                </Button>
              </Flex>
            }
            value={maintenanceCount}
            valueStyle={{ color: "#666cff" }}
            prefix={<ToolOutlined style={{ marginRight: "8px" }} />}
          />
        </Card>
      </Col>

      <Col lg={6} xs={12}>
        <Card
          className="stat-card"
          style={{
            height: "100%",
            borderRadius: "8px",
            borderLeft: "4px solid #666cff",
          }}
          styles={{ body: { padding: "16px" } }}
        >
          <Statistic
            title={
              <Flex justify="space-between" wrap>
                <span style={{ fontSize: "15px", fontWeight: "600" }}>
                  Housekeeping
                </span>
                <Button
                  type="primary"
                  size="small"
                  onClick={openHousekeepingModal}
                  style={{
                    backgroundColor: "#666cff",
                    borderColor: "#666cff",
                  }}
                >
                  Manage
                </Button>
              </Flex>
            }
            value={housekeepingCount}
            valueStyle={{ color: "#666cff" }}
            prefix={<CloseCircleOutlined style={{ marginRight: "8px" }} />}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default RoomStatistics;
