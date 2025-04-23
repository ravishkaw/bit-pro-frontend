import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Avatar,
  Button,
  Row,
  Col,
  Space,
  Descriptions,
  Tag,
  Spin,
} from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { useAuth } from "../../contexts/AuthContext";
import { userService } from "../../services/systemApiService";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const { Title, Text } = Typography;

const UserProfile = () => {
  const [selectedUser, setSelectedUser] = useState({});
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  const fetchUser = async () => {
    try {
      setLoading(true);
      const resp = await userService.getById(user?.userId);
      setSelectedUser(resp);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.userId) {
      fetchUser();
    }
  }, [user?.userId]);

  const [isEditing, setIsEditing] = useState(false);

  // Handle edit toggle
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    // In a real application, you would implement the actual edit functionality here
  };

  return (
    <Card variant="borderless" style={{ padding: 16 }}>
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <Spin size="large" />
          <p style={{ marginTop: 16 }}>Loading profile data...</p>
        </div>
      ) : (
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} sm={8} style={{ textAlign: "center" }}>
            <Space direction="vertical" size="large" align="center">
              <Avatar
                size={120}
                icon={<UserOutlined />}
                src={
                  selectedUser?.photoPath
                    ? `${BASE_URL}${selectedUser.photoPath}`
                    : undefined
                }
                style={{
                  backgroundColor: "transparent",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              />
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={handleEditToggle}
              >
                {isEditing ? "Save Profile" : "Edit Profile"}
              </Button>
            </Space>
          </Col>

          <Col xs={24} sm={16}>
            <Title level={3} style={{ marginTop: 0, marginBottom: 16 }}>
              User Profile
            </Title>

            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item label="Username">
                {selectedUser?.username}
              </Descriptions.Item>
              <Descriptions.Item label="Full Name">
                {selectedUser?.employee?.fullName || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {selectedUser?.email}
              </Descriptions.Item>
              <Descriptions.Item label="Employee ID">
                {selectedUser?.employee?.empNo || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag
                  color={
                    selectedUser?.statusName === "Active" ? "green" : "red"
                  }
                >
                  {selectedUser?.statusName}
                </Tag>
              </Descriptions.Item>

              {selectedUser?.note && (
                <Descriptions.Item label="Notes">
                  {selectedUser?.note}
                </Descriptions.Item>
              )}
            </Descriptions>
          </Col>
        </Row>
      )}
    </Card>
  );
};

export default UserProfile;
