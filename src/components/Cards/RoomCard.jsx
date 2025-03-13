import { Col, Card, Image, Tag, Typography, Flex } from "antd";
import { TeamOutlined } from "@ant-design/icons";

import Styles from "../../constants/Styles";
import CardActions from "./CardActions";

const { Meta } = Card;
const { Text } = Typography;

const RoomCard = ({
  room,
  modulePrivileges,
  handleView,
  handleEdit,
  loadOneRoom,
  openDeleteModal,
}) => {
  // card actions
  const { actions } = CardActions(
    handleView,
    handleEdit,
    openDeleteModal,
    modulePrivileges,
    loadOneRoom,
    room
  );

  const { boxShadow } = Styles();

  return (
    <Col md={8} sm={12} xs={24}>
      <Card
        variant="borderless"
        cover={
          <Image
            style={{
              borderRadius: "8px 8px 0 0",
              height: "200px",
              objectFit: "fill",
            }}
            alt={room.number}
            src={import.meta.env.VITE_IMAGE_URL + room.photo}
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
              <Text strong>Room : {room.number}</Text>
              <Tag color={room.statusName === "Available" ? "green" : "red"}>
                {room.statusName}
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
