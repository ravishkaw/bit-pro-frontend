import { Col, Card, Image, Tag, Typography, Avatar, Space, Flex } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useThemeContext } from "../../contexts/ThemeContext";
import Styles from "../../constants/Styles";

const { Meta } = Card;
const { Text } = Typography;

const RoomCard = ({
  room,
  privileges,
  handleView,
  handleEdit,
  loadOneRoom,
  openDeleteModal,
}) => {
  //define card actions based on privileges
  const actions = [];
  if (privileges.select_privilege) {
    actions.push(
      <EyeOutlined
        style={{ color: "blue" }}
        onClick={() => handleView(loadOneRoom, room.id)}
      />
    );
  }
  if (privileges.update_privilege) {
    actions.push(
      <EditOutlined
        style={{ color: "#fadb14" }}
        onClick={() => handleEdit(loadOneRoom, room.id)}
      />
    );
  }
  if (privileges.delete_privilege) {
    actions.push(
      <DeleteOutlined
        style={{ color: "red" }}
        onClick={() => openDeleteModal(room)}
      />
    );
  }

  const { boxShadow } = Styles();

  return (
    <Col md={8} sm={12} xs={24}>
      <Card
        bordered={false}
        cover={
          <Image
            style={{
              borderRadius: "8px 8px 0 0",
              height: "200px",
              objectFit: "fill",
            }}
            alt={room.roomNumber}
            // src={room.photoPath}
            src="https://i.pinimg.com/originals/e6/4d/f7/e64df7b4341fd3ac448d70cb31457c1c.jpg"
          />
        }
        style={{
          ...boxShadow,
          height: "100%",
        }}
        actions={actions}
      >
        <Meta
          title={
            <Flex justify="space-between" wrap>
              <Text strong>Room : {room.roomNumber}</Text>
              <Tag color={room.status.name === "Available" ? "green" : "red"}>
                {room.status.name}
              </Tag>
            </Flex>
          }
          description={
            <>
              <Flex justify="space-between">
                <Text strong>{room.roomType.name}</Text>
                <Text strong>
                  <TeamOutlined /> {room.capacity} people
                </Text>
              </Flex>
              {/* <Text type="secondary">{room.description}</Text> */}
              {/* <br /> */}
              <Text>Floor: {room.floorNumber}</Text>
              <br />
              <Text strong>Price: ${room.roomType.basePrice}/night</Text>
              <br />
            </>
          }
        />
      </Card>
    </Col>
  );
};

export default RoomCard;
