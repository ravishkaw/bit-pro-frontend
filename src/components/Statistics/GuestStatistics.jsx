import { Row, Col, Card, Flex, Statistic, Button } from "antd";

const GuestStatistics = ({ childHookData, openModal, guestHookData }) => {
  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
      <Col lg={6} xs={12}>
        <Card style={{ height: "100%" }}>
          <Statistic
            title="Total Rooms"
            value={guestHookData?.data?.length || 0}
            valueStyle={{ color: "#3f8600" }}
          />
        </Card>
      </Col>
      <Col lg={6} xs={12}>
        <Card style={{ height: "100%" }}>
          <Statistic
            title="Occupied Rooms"
            value={0}
            valueStyle={{ color: "#3f8600" }}
          />
        </Card>
      </Col>
      <Col lg={6} xs={12}>
        <Card style={{ height: "100%" }}>
          <Statistic
            title="Available Rooms"
            value={0}
            valueStyle={{ color: "#3f8600" }}
          />
        </Card>
      </Col>
      <Col lg={6} xs={12}>
        <Card style={{ height: "100%" }}>
          <Statistic
            title={
              <Flex justify="space-between" wrap>
                Children
                <Button type="dashed" size="small" onClick={openModal}>
                  Manage
                </Button>
              </Flex>
            }
            value={childHookData?.data?.length || 0}
            valueStyle={{ color: "#3f8600" }}
          />
        </Card>
      </Col>
    </Row>
  );
};
export default GuestStatistics;
