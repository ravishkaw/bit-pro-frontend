import { Card, List, Row, Col, Typography } from "antd";

const { Text, Title } = Typography;

const Dashboard = () => {
  const finished = [
    {
      title: "Employee module",
    },
    {
      title: "User module",
    },
    {
      title: "Privilege module",
    },
  ];
  const onGoing = [
    {
      title: "Room module",
    },
    {
      title: "Room Type module",
    },
    {
      title: "Room and reservation other modules",
    },
  ];
  const data = [
    {
      title: "Privilege page pagination ( will fix the search too )",
    },
    {
      title:
        "Finish Room type, amenities, inventory (room and reservation )and other pages",
    },
    {
      title: "Finish room and reservation other pages",
    },
    {
      title: "User profile and page",
    },
    {
      title: "Filter admin role in user page",
    },
    {
      title: "Notification popover",
    },
    {
      title: "Pictures endpoint",
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Card>
          <Title level={3}>Finished</Title>
          <List
            dataSource={finished}
            renderItem={(item) => <List.Item>{item.title}</List.Item>}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <Title level={3}>On Going</Title>
          <List
            dataSource={onGoing}
            renderItem={(item) => <List.Item>{item.title}</List.Item>}
          />
        </Card>
      </Col>
      <Col span={24}>
        <Card>
          <Title level={3}>To do</Title>
          <List
            dataSource={data}
            renderItem={(item) => <List.Item>{item.title}</List.Item>}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;
