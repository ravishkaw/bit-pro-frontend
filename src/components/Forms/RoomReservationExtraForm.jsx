import { useState } from "react";
import {
  Form,
  Select,
  Button,
  Card,
  InputNumber,
  Divider,
  Typography,
  Space,
  Row,
  Col,
  Flex,
  Input,
} from "antd";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const RoomReservationExtraForm = ({
  form,
  isEditing,
  setCurrent,
  next,
  prev,
  amenities,
  roomPackages,
  checkRoomReservationPricing,
  setPricingLoading,
  setPricingInformation,
}) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // Handle package selection
  const handlePackageChange = (value) => {
    setSelectedPackage(value);
  };

  // Handle amenity quantity change
  const handleAmenityQuantityChange = (amenityId, newQty) => {
    const newQuantity = Math.max(0, Math.min(10, newQty || 0));

    setSelectedAmenities((prevAmenities) => {
      // If quantity is 0, remove from selection
      if (newQuantity === 0) {
        return prevAmenities.filter((amenity) => amenity.id !== amenityId);
      }

      // If already selected, update quantity
      const existingIndex = prevAmenities.findIndex(
        (amenity) => amenity.id === amenityId
      );
      if (existingIndex >= 0) {
        const updatedAmenities = [...prevAmenities];
        updatedAmenities[existingIndex] = {
          ...updatedAmenities[existingIndex],
          quantity: newQuantity,
        };
        return updatedAmenities;
      }

      // Add new selection
      return [...prevAmenities, { id: amenityId, quantity: newQuantity }];
    });
  };

  // check pricing
  const checkPricing = async () => {
    setPricingLoading(true);
    try {
      // Get the form values properly
      const roomId = form.getFieldValue("roomId").value;
      const checkInDate = form.getFieldValue("reservationDateRange")[0];
      const checkOutDate = form.getFieldValue("reservationDateRange")[1];

      // Ensure we have valid data before proceeding
      if (!roomId || !checkInDate || !checkOutDate || !selectedPackage) {
        console.error("Missing required reservation details");
        setPricingLoading(false);
        return;
      }

      const formattedCheckInDate =
        checkInDate?.format?.("YYYY-MM-DD") || checkInDate;
      const formattedCheckOutDate =
        checkOutDate?.format?.("YYYY-MM-DD") || checkOutDate;

      const resp = await checkRoomReservationPricing({
        roomId: roomId,
        checkInDate: formattedCheckInDate,
        checkOutDate: formattedCheckOutDate,
        amenities: selectedAmenities.map((amenity) => ({
          amenityId: amenity.id,
          quantity: amenity.quantity,
        })),
        roomPackageId: selectedPackage,
      });

      setPricingInformation(resp);
      setPricingLoading(false);
    } catch (error) {
      setPricingLoading(false);
      console.error("Error checking pricing:", error);
    }
  };

  // Handle next
  const handleNext = async () => {
    form.setFieldsValue({
      amenities: selectedAmenities,
      packageId: selectedPackage,
    });

    await checkPricing();
    next();
  };

  // Reset form fields and state
  const handleReset = () => {
    form.resetFields();
    setCurrent(0);
    setSelectedAmenities([]);
    setSelectedPackage([]);
  };

  return (
    <>
      {/* Package Selection */}
      <div>
        <Form.Item
          label="Select a Package"
          name="packageId"
          rules={[{ required: true, message: "Please select a package" }]}
        >
          <Select
            placeholder="Select a package"
            onChange={handlePackageChange}
          >
            {roomPackages.map((pkg) => (
              <Option key={pkg.id} value={pkg.id}>
                {pkg.name} -{" "}
                {pkg.price.toLocaleString("en-LK", {
                  style: "currency",
                  currency: "LKR",
                })}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {selectedPackage && (
          <Text
            type="secondary"
            style={{ marginTop: -16, display: "block", marginBottom: 16 }}
          >
            {roomPackages
              .find((p) => p.id === selectedPackage)
              ?.amenities?.map(
                (amenity) =>
                  `| ${amenity.amenityName} ${
                    amenity.quantity > 0 ? `(${amenity.quantity}) ` : " "
                  }`
              )}
          </Text>
        )}
      </div>

      <Divider />

      {/* Amenities Selection */}
      <div>
        <Form.Item label="Add Optional Amenities">
          <Row gutter={[16, 16]}>
            {amenities.map((amenity) => {
              const selectedAmenity = selectedAmenities.find(
                (a) => a.id === amenity.id
              );
              const quantity = selectedAmenity ? selectedAmenity.quantity : 0;

              return (
                <Col xs={24} sm={12} md={6} key={amenity.id}>
                  <Card style={{ height: "100%" }} hoverable>
                    <Title level={5}>{amenity.name}</Title>
                    <Text type="secondary">
                      {amenity.price.toLocaleString("en-LK", {
                        style: "currency",
                        currency: "LKR",
                      })}{" "}
                      each
                    </Text>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: 16,
                      }}
                    >
                      <Button
                        type="default"
                        onClick={() =>
                          handleAmenityQuantityChange(amenity.id, quantity - 1)
                        }
                        disabled={quantity <= 0}
                      >
                        -
                      </Button>
                      <InputNumber
                        min={0}
                        max={10}
                        value={quantity}
                        onChange={(value) =>
                          handleAmenityQuantityChange(amenity.id, value)
                        }
                        style={{
                          width: 60,
                          margin: "0 8px",
                          textAlign: "center",
                        }}
                      />
                      <Button
                        type="default"
                        onClick={() =>
                          handleAmenityQuantityChange(amenity.id, quantity + 1)
                        }
                        disabled={quantity >= 10}
                      >
                        +
                      </Button>
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <Text type="secondary">Max: 10</Text>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Form.Item>
      </div>

      <Form.Item name="amenities" hidden>
        <Input hidden />
      </Form.Item>

      <Flex
        justify={isEditing ? "end" : "space-between"}
        style={{ marginTop: 16 }}
      >
        {!isEditing && (
          <Button color="default" variant="dashed" onClick={handleReset}>
            Reset
          </Button>
        )}
        <Space>
          <Button onClick={prev}>Previous</Button>
          <Button type="primary" onClick={handleNext}>
            Proceed To Checkout
          </Button>
        </Space>
      </Flex>
    </>
  );
};

export default RoomReservationExtraForm;
