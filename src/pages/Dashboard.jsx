import { Card, List, Typography } from "antd";

const { Text, Title } = Typography;

const Dashboard = () => {
  const data = [
    {
      title: "Privilege page pagination ( will fix the search too )",
    },
    {
      title: "User profile and page",
    },
    {
      title: "Filter admin role",
    },
    {
      title: "Notification popover",
    },
    {
      title: "Sidebar items grouping",
    },
  ];

  return (
    <Card>
      <Title level={3}>To do</Title>
      <List
        dataSource={data}
        renderItem={(item) => <List.Item>{item.title}</List.Item>}
      />
    </Card>
  );
};

export default Dashboard;
