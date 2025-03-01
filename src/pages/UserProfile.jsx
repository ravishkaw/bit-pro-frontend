import { Card, Typography } from "antd";
import { useAuth } from "../contexts/AuthContext";

const { Title, Text } = Typography;
const UserProfile = () => {
  const { user } = useAuth();

  return (
    <Card>
      <Title level={3}> User Profile</Title>
      <Text> {user.username}</Text>
    </Card>
  );
};
export default UserProfile;
