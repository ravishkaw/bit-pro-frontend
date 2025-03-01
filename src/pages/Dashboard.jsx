import { Card, List, Row, Col, Typography, Tag } from "antd";

const { Text, Title } = Typography;

const Dashboard = () => {
  const finished = [
    { title: "Employee module" },
    { title: "User module" },
    { title: "Privilege module" },
    { title: "Room Type module" },
    { title: "Room Anemity module" },
    { title: "Room Pricing module" },
  ];

  const onGoing = [
    { title: "Room module" },
    { title: "Room Inventory (Will have to make dummy main inventory)" },
    { title: "Room" },
    { title: "Guest Module > Duplicate of Employee with minor changes" },
    { title: "Room reservation" },
  ];

  const todo = [
    {
      title: "Pagination of all pages (will fix the search too)- Fixed",
      done: true,
      hasIssue: "Numbers not sorting correctly",
    },
    { title: "Card edit view, delete", done: false },
    { title: "User profile and page", done: false },
    { title: "Notification popover", done: false },
    { title: "Pictures endpoint", done: false },
  ];

  return (
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <Card>
          <Title level={3}>Finished</Title>
          <List
            dataSource={finished}
            renderItem={(item) => (
              <List.Item>
                <Text type="success">{item.title}</Text>
              </List.Item>
            )}
          />
        </Card>
      </Col>

      <Col span={8}>
        <Card>
          <Title level={3}>On Going</Title>
          <List
            dataSource={onGoing}
            renderItem={(item) => (
              <List.Item>
                <Text type="warning" strong>
                  {item.title}
                </Text>
              </List.Item>
            )}
          />
        </Card>
      </Col>

      <Col span={8}>
        <Card>
          <Title level={3}>To do</Title>
          <List
            dataSource={todo}
            renderItem={(item) => (
              <List.Item>
                {item.done ? (
                  <Text delete>
                    {item.title}
                    {item.hasIssue && (
                      <Tag color="error" style={{ marginLeft: 8 }}>
                        Bug: {item.hasIssue}
                      </Tag>
                    )}
                  </Text>
                ) : (
                  <Text>{item.title}</Text>
                )}
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;
