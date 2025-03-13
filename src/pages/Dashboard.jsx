import { Card, List, Row, Col, Typography, Tag } from "antd";
import Styles from "../constants/Styles";

const { Text, Title } = Typography;

const Dashboard = () => {
  const finished = [
    { title: "Employee module" },
    { title: "User module" },
    { title: "Privilege module" },
    { title: "Room facilitity" },
    { title: "Room pricing rule" },
  ];

  const onGoing = [
    { title: "Room Inventory" },
    { title: "Room" },
    { title: "Guest Module > Duplicate of Employee with minor changes" },
    { title: "Room reservation" },
  ];

  const todo = [
    {
      title:
        "Make again and familiar with security, privilege check and image upload",
      done: false,
    },
    {
      title:
        "Make again and familiar with app sider functions and some other functions that made with AI",
      done: false,
    },
    { title: "Room module - ui and forms", done: false },
    { title: "Finish inventory - only made fetch all->fe & be", done: false },
    { title: "Room Inventory needs more attention and fixes", done: false },
    { title: "Notification popover", done: false },
    { title: "Pictures endpoint", done: true },
  ];

  const { boxShadow } = Styles();

  return (
    <Row gutter={[20, 20]}>
      <Col md={8} xs={24}>
        <Card variant="borderless" style={{ ...boxShadow }}>
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

      <Col md={8} xs={24}>
        <Card variant="borderless" style={{ ...boxShadow }}>
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

      <Col md={8} xs={24}>
        <Card variant="borderless" style={{ ...boxShadow }}>
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
