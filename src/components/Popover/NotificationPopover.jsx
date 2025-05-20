import {
  Badge,
  Popover,
  List,
  Button,
  Spin,
  Space,
  Tooltip,
  message,
} from "antd";
import {
  BellOutlined,
  ReloadOutlined,
  CheckOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../contexts/AuthContext";
import useWebSocket from "../../hooks/common/useWebSocket";
import {
  fetchUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getUnreadNotificationCount,
  markNotificationAsResolved,
} from "../../services/notificationsApiService";

const NotificationPopover = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [markingAll, setMarkingAll] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useAuth();
  const { isConnected, isConnecting, subscribe, reconnect } = useWebSocket(
    user?.userId
  );

  // Handle new notification
  const handleNewNotification = useCallback((notification) => {
    if (notification.isRead === undefined) {
      notification.isRead = false;
    }
    setNotifications((prev) => [notification, ...prev]);
    setUnreadCount((prev) => (notification.isRead ? prev : prev + 1));
  }, []);

  // Fetch notifications and unread count
  const fetchNotifications = useCallback(async () => {
    if (!user?.userId) return;
    setLoading(true);
    const [data, count] = await Promise.all([
      fetchUserNotifications(user.userId),
      getUnreadNotificationCount(user.userId),
    ]);
    setNotifications(data);
    setUnreadCount(count);
    setLoading(false);
  }, [user?.userId]);

  // Subscribe to notifications when connected
  useEffect(() => {
    if (!isConnected || !user?.userId) return;

    let notificationSubscription;

    try {
      // Subscribe to regular notifications
      notificationSubscription = subscribe(
        `/user/queue/notifications`,
        (notification) => {
          console.log("Received notification:", notification);
          handleNewNotification(notification);
        }
      );

      fetchNotifications();
    } catch (error) {
      console.error("Error subscribing:", error);
    }

    return () => {
      // Cleanup subscriptions
      if (notificationSubscription) {
        try {
          notificationSubscription.unsubscribe();
        } catch (error) {
          console.error("Error unsubscribing from notifications:", error);
        }
      }
    };
  }, [
    isConnected,
    user?.userId,
    subscribe,
    handleNewNotification,
    fetchNotifications,
    messageApi,
  ]);

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    if (!user?.userId) return;
    const success = await markNotificationAsRead(notificationId, user.userId);
    if (success) {
      await fetchNotifications(); // Always fetch latest notifications and count
    }
  };

  // Mark all notifications as read
  const handleMarkAllAsRead = async () => {
    if (!user?.userId || unreadCount === 0) return;
    setMarkingAll(true);
    const success = await markAllNotificationsAsRead(user.userId);
    if (success) {
      await fetchNotifications();
      messageApi.success("All notifications marked as read");
    } else {
      messageApi.error("Failed to mark all as read");
    }
    setMarkingAll(false);
  };

  // Resolve notification (mark as resolved and remove from list)
  const resolveNotification = async (notificationId) => {
    if (!user?.userId) return;
    const success = await markNotificationAsResolved(notificationId);
    if (success) {
      await fetchNotifications();
      messageApi.success("Notification resolved");
    } else {
      messageApi.error("Failed to resolve notification");
    }
  };

  // Manual reconnect button handler with safety checks
  const handleReconnect = () => {
    if (isConnecting) return;
    reconnect((client) => {
      try {
        if (client && client.connected) {
          client.subscribe(`/user/queue/notifications`, (message) => {
            try {
              const notification = JSON.parse(message.body);
              handleNewNotification(notification);
            } catch (error) {
              console.error("Error processing notification:", error);
            }
          });
          fetchNotifications();
        }
      } catch (error) {
        console.error("Error in reconnect callback:", error);
      }
    });
  };

  return (
    <>
      {contextHolder}
      <Popover
        content={
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
                gap: 8,
              }}
            >
              <span>
                <strong>Notifications</strong>
                <span
                  style={{
                    color: isConnected ? "green" : "red",
                    marginLeft: 8,
                  }}
                >
                  • {isConnected ? "Connected" : "Not connected"}
                </span>
              </span>
              <Space>
                <Tooltip title="Mark all as read">
                  <Button
                    size="small"
                    icon={<EyeOutlined />}
                    onClick={handleMarkAllAsRead}
                    disabled={unreadCount === 0 || markingAll}
                    loading={markingAll}
                  />
                </Tooltip>
                <Button
                  type="text"
                  icon={<ReloadOutlined spin={isConnecting} />}
                  size="small"
                  onClick={handleReconnect}
                  disabled={isConnecting}
                />
              </Space>
            </div>
            {loading || isConnecting ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <Spin size="small" />
                <p>Loading...</p>
              </div>
            ) : (
              <List
                dataSource={notifications}
                renderItem={(item) => (
                  <List.Item
                    style={{
                      opacity: item.isRead ? 0.7 : 1,
                    }}
                    actions={[
                      <Space>
                        <Tooltip title="Mark as Read">
                          <Button
                            size="small"
                            type="text"
                            icon={<EyeOutlined />}
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(item.id);
                            }}
                            disabled={item.isRead}
                          />
                        </Tooltip>
                        <Tooltip title="Resolve">
                          <Button
                            size="small"
                            type="text"
                            icon={<CheckOutlined />}
                            onClick={(e) => {
                              e.stopPropagation();
                              resolveNotification(item.id);
                            }}
                          />
                        </Tooltip>
                      </Space>,
                    ]}
                  >
                    <List.Item.Meta
                      title={
                        <span
                          style={{
                            fontWeight: item.isRead ? "normal" : "bold",
                          }}
                        >
                          {item.title}
                        </span>
                      }
                      description={
                        <div>
                          <p>{item.message}</p>
                          <small style={{ color: "#888" }}>
                            {new Date(item.createdAt).toLocaleString()}
                          </small>
                        </div>
                      }
                    />
                  </List.Item>
                )}
                style={{ width: 300, maxHeight: 400, overflowY: "auto" }}
                pagination={{
                  pageSize: 5,
                  hideOnSinglePage: true,
                  size: "small",
                }}
                locale={{ emptyText: "No notifications" }}
              />
            )}
          </div>
        }
        trigger="hover"
        placement="bottom"
        styles={{ body: { marginRight: 16 } }}
      >
        <Badge count={unreadCount} size="small">
          <BellOutlined
            style={{
              fontSize: "1.25rem",
              lineHeight: 64,
              verticalAlign: "middle",
              cursor: "pointer",
              color: isConnected ? undefined : "#ff4d4f",
            }}
            aria-label="Notifications"
          />
        </Badge>
      </Popover>
    </>
  );
};

export default NotificationPopover;
