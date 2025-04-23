import { Col, Card, Tag, Typography, Flex, Divider, List, Avatar } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

import CardActions from "./CardActions";

const { Text, Title } = Typography;

const RoomPackageCard = ({
  roomPackage,
  modulePrivileges,
  handleView,
  handleEdit,
  opendeleteRestoreModal,
  loadOneItem,
  showView,
}) => {
  // card actions
  const { actions } = CardActions(
    handleView,
    handleEdit,
    opendeleteRestoreModal,
    modulePrivileges,
    loadOneItem,
    roomPackage,
    (showView = false)
  );  

  return (
    <Col md={8} sm={12} xs={24}>
      <Card
        hoverable
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        styles={{
          body: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
          },
        }}
        actions={actions}
      >
        <div style={{ flex: 1 }}>
          <Title
            level={3}
            style={{ margin: 0, textAlign: "center", color: "#1890ff" }}
          >
            {roomPackage?.name}
          </Title>

          <div>
            <Flex vertical align="center" gap="small">
              <Text style={{ textAlign: "center", margin: "12px 0" }}>
                {roomPackage?.description}
              </Text>
              <Flex gap="small" justify="center" align="center">
                Price :{" "}
                <Tag
                  color="blue"
                  style={{
                    padding: "2px 10px",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  ${roomPackage?.price}
                </Tag>
                Status :{" "}
                <Tag
                  color={roomPackage?.statusName === "Active" ? "green" : "red"}
                  style={{ padding: "2px 10px", fontSize: "14px" }}
                >
                  {roomPackage?.statusName}
                </Tag>
              </Flex>
            </Flex>

            {roomPackage?.amenities?.length > 0 && (
              <>
                <Divider orientation="center">Amenities</Divider>
                <List
                  size="small"
                  dataSource={roomPackage?.amenities}
                  style={{ width: "70%", margin: "0 auto" }}
                  renderItem={(amenity) => (
                    <List.Item key={amenity.id || amenity.amenityName}>
                      <Flex align="center" gap="middle" justify="center">
                        <Avatar
                          size="small"
                          icon={<CheckCircleOutlined />}
                          style={{ backgroundColor: "#52c41a" }}
                        />
                        <Text>{amenity?.amenityName}</Text>
                        {amenity?.quantity &&
                          (amenity?.quantity == -1 ? null : (
                            <Tag color="cyan">{amenity.quantity}</Tag>
                          ))}
                      </Flex>
                    </List.Item>
                  )}
                />
              </>
            )}
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default RoomPackageCard;
