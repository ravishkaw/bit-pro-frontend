import { Col, Card, Tag, Typography, Flex } from "antd";
import { TeamOutlined } from "@ant-design/icons";

import CardActions from "./CardActions";

const { Meta } = Card;
const { Text } = Typography;

const RoomCard = ({
  room,
  modulePrivileges,
  handleView,
  handleEdit,
  loadOneRoom,
  opendeleteRestoreModal,
  showView,
}) => {
  // Image preview
  // const [previewVisible, setPreviewVisible] = useState(false);

  // card actions
  const { actions } = CardActions(
    handleView,
    handleEdit,
    opendeleteRestoreModal,
    modulePrivileges,
    loadOneRoom,
    room,
    (showView = true)
  );

  return (
    <Col md={8} sm={12} xs={24}>
      <Card
        hoverable
        cover={
          <img
            style={{
              padding: 20,
              borderRadius: "8px 8px 0 0",
              height: "200px",
              objectFit: "fill",
            }}
            alt={room.number}
            src={import.meta.env.VITE_IMAGE_URL + room.photo}
            // onClick={() => setPreviewVisible(true)}
            // preview={{
            //   visible: previewVisible,
            //   onVisibleChange: (visible) => {
            //     if (!visible) setPreviewVisible(false);
            //   },
            // }}
          />
        }
        style={{
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
              <Flex
                justify="space-between"
                align="center"
                style={{ marginBottom: "12px" }}
              >
                <Text strong style={{ fontSize: "15px" }}>
                  Room Type: {room.roomType.name}
                </Text>
                <Tag
                  color="blue"
                  style={{ padding: "2px 8px", fontWeight: "bold" }}
                >
                  {room?.price?.toLocaleString("en-LK", {
                    style: "currency",
                    currency: "LKR",
                  })}
                </Tag>
              </Flex>

              <Text strong style={{ display: "block", marginBottom: "8px" }}>
                Capacity:
              </Text>
              <Flex gap={12} wrap="wrap" style={{ marginBottom: "16px" }}>
                <Flex align="center" gap={4}>
                  <TeamOutlined style={{ color: "#1890ff" }} />
                  <Text>{room.adultNo || 0} Adults</Text>
                </Flex>
                <Flex align="center" gap={4}>
                  <TeamOutlined style={{ color: "#52c41a" }} />
                  <Text>{room.childNo || 0} Children</Text>
                </Flex>
                <Flex align="center" gap={4}>
                  <TeamOutlined style={{ color: "#faad14" }} />
                  <Text>{room.infantNo || 0} Infant</Text>
                </Flex>
              </Flex>

              <Flex align="center">
                <Text type="secondary">
                  <span style={{ fontWeight: "bold" }}>Floor:</span>{" "}
                  {room.floorNumber}
                </Text>
              </Flex>
            </>
          }
        />
      </Card>
    </Col>
  );
};

export default RoomCard;
