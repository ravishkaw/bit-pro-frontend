import { Row, Col, Card, Flex, Statistic, Button, Badge } from "antd";
import { TeamOutlined, SmileOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

const GuestStatistics = ({ childHookData, openModal, guestHookData }) => {
  const [statistics, setStatistics] = useState({
    totalGuests: 0,
    adultGuests: 0,
    childGuests: 0,
    childrenPercentage: 0,
  });

  useEffect(() => {
    if (guestHookData?.data) {
      const childGuests = childHookData?.data?.length || 0;
      const adultGuests = guestHookData?.data?.length || 0;
      const totalGuests = childGuests + adultGuests;

      // Calculate children percentage
      const childrenPercentage =
        totalGuests > 0 ? Math.round((childGuests / totalGuests) * 100) : 0;

      setStatistics({
        totalGuests,
        adultGuests,
        childGuests,
        childrenPercentage,
      });
    }
  }, [guestHookData, childHookData]);

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 12 }}>
      {/* Total Guests Card */}
      <Col lg={12} md={12} xs={24}>
        <Card
          className="stat-card"
          style={{
            height: "100%",
            borderRadius: "8px",
            borderLeft: "4px solid #1890ff",
          }}
          styles={{ body: { padding: "16px" } }}
        >
          <Flex align="center" justify="space-between">
            <Statistic
              title={
                <span style={{ fontSize: "15px", fontWeight: "600" }}>
                  Total Guests
                </span>
              }
              value={statistics.totalGuests}
              valueStyle={{ color: "#1890ff", fontSize: "24px" }}
              prefix={<TeamOutlined style={{ fontSize: "20px" }} />}
            />
            <Flex vertical align="start" style={{ minWidth: "100px" }}>
              <div style={{ marginBottom: "4px" }}>
                <Badge
                  color="#faad14"
                  text={`${statistics.adultGuests} Adults`}
                />
              </div>
              <div>
                <Badge
                  color="#722ed1"
                  text={`${statistics.childGuests} Children`}
                />
              </div>
            </Flex>
          </Flex>
        </Card>
      </Col>

      {/* Children Card */}
      <Col lg={12} md={12} xs={24}>
        <Card
          className="stat-card"
          style={{
            height: "100%",
            borderRadius: "8px",
            borderLeft: "4px solid #722ed1",
          }}
          styles={{ body: { padding: "16px" } }}
        >
          <Flex align="center" justify="space-between">
            <Flex vertical>
              <Statistic
                title={
                  <span style={{ fontSize: "15px", fontWeight: "600" }}>
                    Children
                  </span>
                }
                value={statistics.childGuests}
                valueStyle={{
                  color: "#722ed1",
                  fontSize: "24px",
                }}
                prefix={
                  <SmileOutlined
                    style={{ fontSize: "20px", marginRight: "8px" }}
                  />
                }
                suffix={
                  <small style={{ fontSize: "12px", marginLeft: "16px" }}>
                    {statistics.childrenPercentage}% of guests
                  </small>
                }
              />
            </Flex>

            <Button
              type="primary"
              onClick={openModal}
              style={{
                background: "#722ed1",
                borderColor: "#722ed1",
              }}
              icon={<SmileOutlined />}
            >
              Manage Children
            </Button>
          </Flex>
        </Card>
      </Col>
    </Row>
  );
};

export default GuestStatistics;
