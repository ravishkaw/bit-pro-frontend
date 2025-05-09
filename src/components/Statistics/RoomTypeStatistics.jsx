import {
  CheckCircleOutlined,
  FundProjectionScreenOutlined,
  GoldOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Flex, Row, Statistic } from "antd";

const RoomTypeStatistics = ({
  roomTypeHookData,
  pricingRuleHookData,
  openModal,
}) => {
  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
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
              <span style={{ fontSize: "15px", fontWeight: "600" }}>
                Total Room Types
              </span>
            }
            value={roomTypeHookData?.data?.length || 0}
            valueStyle={{ color: "#666cff" }}
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
              <span style={{ fontSize: "15px", fontWeight: "600" }}>
                Total Active Room Types
              </span>
            }
            value={roomTypeHookData?.data?.length || 0}
            valueStyle={{ color: "#666cff" }}
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
              <span style={{ fontSize: "15px", fontWeight: "600" }}>
                Total Bed Types
              </span>
            }
            value={roomTypeHookData?.additionalData?.bedTypes?.length || 0}
            valueStyle={{ color: "#666cff" }}
            prefix={
              <GoldOutlined style={{  marginRight: "8px" }} />
            }
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
                  Pricing Rules
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
            value={pricingRuleHookData?.data?.length || 0}
            valueStyle={{ color: "#666cff" }}
            prefix={
              <FundProjectionScreenOutlined
                style={{  marginRight: "8px" }}
              />
            }
          />
        </Card>
      </Col>
    </Row>
  );
};

export default RoomTypeStatistics;
