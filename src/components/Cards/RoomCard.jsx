import { Col, Card, Image, Tag, Typography, Avatar, Space, Flex } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../contexts/AuthContext";

const { Meta } = Card;
const { Text } = Typography;

const RoomCard = ({
  room,
  handleView,
  handleEdit,
  loadOneRoom,
  openDeleteModal,
}) => {
  const { privileges } = useAuth();

  // Find the module related to "Room" in the privileges
  const roomModule = privileges?.find(
    (privilegedModule) => privilegedModule.module_name === "Room"
  );

  //define card actions based on privileges
  const actions = [];
  if (roomModule.select_privilege) {
    actions.push(
      <EyeOutlined
        style={{ color: "blue" }}
        onClick={() => handleView(loadOneRoom, room.id)}
      />
    );
  }
  if (roomModule.update_privilege) {
    actions.push(
      <EditOutlined
        style={{ color: "#fadb14" }}
        onClick={() => handleEdit(loadOneRoom, room.id)}
      />
    );
  }
  if (roomModule.delete_privilege) {
    actions.push(
      <DeleteOutlined
        style={{ color: "red" }}
        onClick={() => openDeleteModal(room)}
      />
    );
  }

  return (
    <Col lg={6} md={8} sm={12} xs={24}>
      <Card
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
        style={{ boxShadow: "2px 2px 5px 2px #d8d8d8" }}
        actions={actions}
      >
        <Meta
          title={`Room No : ${room.roomNumber}`}
          description={
            <>
              <Flex justify="space-between">
                <Text strong>{room.roomType.name}</Text>
                <Text strong>
                  <TeamOutlined /> {room.capacity} people
                </Text>
              </Flex>
              <Text type="secondary">{room.description}</Text>
              <br />
              <Text>Floor: {room.floorNumber}</Text>
              <br />
              <Text strong>Price: ${room.roomType.basePrice}/night</Text>
              <br />
              <Tag color={room.status.name === "Available" ? "green" : "red"}>
                {room.status.name}
              </Tag>
            </>
          }
        />
      </Card>
    </Col>
  );
};

export default RoomCard;
