import { Button, Card, Col, Flex, Row, Statistic } from "antd";

const RoomTypeStatistics = ({
  roomTypeHookData,
  pricingRuleHookData,
  openModal,
}) => {
  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
      <Col lg={6} xs={12}>
        <Card style={{ height: "100%" }}>
          <Statistic
            title="Total Room Types"
            value={roomTypeHookData?.data?.length || 0}
            valueStyle={{ color: "#3f8600" }}
          />
        </Card>
      </Col>
      <Col lg={6} xs={12}>
        <Card style={{ height: "100%" }}>
          <Statistic
            title="Total Active Room Types"
            value={roomTypeHookData?.data?.length || 0}
            valueStyle={{ color: "#3f8600" }}
          />
        </Card>
      </Col>
      <Col lg={6} xs={12}>
        <Card style={{ height: "100%" }}>
          <Statistic
            title="Total Bed Types"
            value={roomTypeHookData?.additionalData?.bedTypes?.length || 0}
            valueStyle={{ color: "#3f8600" }}
          />
        </Card>
      </Col>
      <Col lg={6} xs={12}>
        <Card style={{ height: "100%" }}>
          <Statistic
            title={
              <Flex justify="space-between" wrap>
                Total Pricing Rules
                <Button type="dashed" size="small" onClick={openModal}>
                  Manage
                </Button>
              </Flex>
            }
            value={pricingRuleHookData?.data?.length || 0}
            valueStyle={{ color: "#3f8600" }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default RoomTypeStatistics;
