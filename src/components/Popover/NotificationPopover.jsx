import { Badge, Popover, List } from "antd";
import { BellOutlined } from "@ant-design/icons";

// Header notification button
const NotificationPopover = () => {
  const notifications = [
    {
      id: 1,
      title: "Notification 1",
      description: "This is the first notification.",
    },
    {
      id: 2,
      title: "Notification 2",
      description: "This is the second notification.",
    },
    {
      id: 3,
      title: "Notification 3",
      description: "Another notification.",
    },
  ];
  return (
    <Popover
      content={
        <List
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
          style={{ width: 300 }}
        />
      }
      trigger="hover"
      placement="bottom"
      styles={{ body: { width: 300, marginRight: 20 } }}
    >
      <Badge count={notifications.length} size="small">
        <BellOutlined style={iconStyle} aria-label="Notifications" />
      </Badge>
    </Popover>
  );
};

export default NotificationPopover;

const iconStyle = {
  fontSize: "1.25rem",
  lineHeight: 64,
  verticalAlign: "middle",
  cursor: "pointer",
};
