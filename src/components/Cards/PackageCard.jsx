import {
  Col,
  Card,
  Tag,
  Typography,
  Flex,
  Divider,
  List,
  Avatar,
  Space,
} from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

import CardActions from "./CardActions";

const { Text, Title } = Typography;

const PackageCard = ({
  packages,
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
    packages,
    (showView = false)
  );

  return (
    <Col xxl={4} lg={6} md={8} sm={12} xs={24}>
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
            {packages?.name}
          </Title>

          <div>
            <Flex vertical align="center" gap="small">
              <Text style={{ textAlign: "center", margin: "12px 0" }}>
                {packages?.description}
              </Text>
              <Space wrap>
                <Tag
                  color="blue"
                  style={{
                    padding: "2px 10px",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  {packages?.price.toLocaleString("en-LK", {
                    style: "currency",
                    currency: "LKR",
                  })}
                </Tag>
                <Tag
                  color={packages?.statusName === "Active" ? "green" : "red"}
                  style={{ padding: "2px 10px", fontSize: "14px" }}
                >
                  {packages?.statusName}
                </Tag>
              </Space>
            </Flex>

            <ItemsList
              title="Amenities"
              items={packages?.amenities}
              nameField="amenityName"
            />

            <ItemsList
              title="Event Services"
              items={packages?.services}
              nameField="serviceName"
            />
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default PackageCard;

// display both amenities and event services
const ItemsList = ({ title, items, nameField }) => {
  if (!items?.length) return null;

  return (
    <>
      <Divider orientation="center">{title}</Divider>
      <List
        size="small"
        dataSource={items}
        style={{ margin: "0 auto" }}
        renderItem={(item) => (
          <List.Item key={item.id || item[nameField]}>
            <Flex align="center" gap="middle" justify="center">
              <Avatar
                size="small"
                icon={<CheckCircleOutlined />}
                style={{ backgroundColor: "#52c41a" }}
              />
              <Text>{item[nameField]}</Text>
              {item?.quantity &&
                (item?.quantity === -1 ? null : (
                  <Tag color="cyan">{item.quantity}</Tag>
                ))}
            </Flex>
          </List.Item>
        )}
      />
    </>
  );
};
