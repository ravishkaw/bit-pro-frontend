import { useState, useEffect } from "react";
import {
  Typography,
  Select,
  Card,
  InputNumber,
  Button,
  Divider,
  Row,
  Col,
  Space,
  Form,
} from "antd";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const RoomReservationExtraForm = ({ onSubmit, initialValues = {} }) => {
  // Sample data - replace with actual API calls
  const packages = [
    {
      id: 1,
      name: "Basic Package",
      price: 50,
      description: "Daily housekeeping, wifi",
    },
    {
      id: 2,
      name: "Premium Package",
      price: 100,
      description: "Daily housekeeping, wifi, breakfast",
    },
    {
      id: 3,
      name: "Luxury Package",
      price: 200,
      description: "Daily housekeeping, wifi, all meals, spa access",
    },
  ];

  const amenities = [
    { id: 1, name: "Champagne Bottle", price: 75, maxQuantity: 5 },
    { id: 2, name: "Fruit Basket", price: 25, maxQuantity: 3 },
    { id: 3, name: "Spa Treatment", price: 120, maxQuantity: 10 },
    { id: 4, name: "Airport Transfer", price: 60, maxQuantity: 2 },
  ];

  const [selectedPackage, setSelectedPackage] = useState(
    initialValues.packageId || ""
  );
  const [selectedAmenities, setSelectedAmenities] = useState(
    initialValues.amenities || []
  );
  const [totalPrice, setTotalPrice] = useState(0);

  // Update total price whenever selections change
  useEffect(() => {
    let price = 0;

    // Add package price
    if (selectedPackage) {
      const packageItem = packages.find((p) => p.id === selectedPackage);
      if (packageItem) price += packageItem.price;
    }

    // Add amenities prices
    selectedAmenities.forEach((amenity) => {
      const amenityItem = amenities.find((a) => a.id === amenity.id);
      if (amenityItem) price += amenityItem.price * amenity.quantity;
    });

    setTotalPrice(price);
  }, [selectedPackage, selectedAmenities]);

  const handlePackageChange = (value) => {
    setSelectedPackage(value);
  };

  const handleAmenityQuantityChange = (amenityId, quantity) => {
    const amenity = amenities.find((a) => a.id === amenityId);

    // Ensure quantity is within valid range
    if (quantity < 0) quantity = 0;
    if (quantity > amenity.maxQuantity) quantity = amenity.maxQuantity;

    // Check if amenity already exists in the selected list
    const existingIndex = selectedAmenities.findIndex(
      (a) => a.id === amenityId
    );

    if (existingIndex >= 0) {
      // Update existing amenity
      const updatedAmenities = [...selectedAmenities];
      if (quantity === 0) {
        // Remove amenity if quantity is 0
        updatedAmenities.splice(existingIndex, 1);
      } else {
        // Update quantity
        updatedAmenities[existingIndex] = {
          ...updatedAmenities[existingIndex],
          quantity,
        };
      }
      setSelectedAmenities(updatedAmenities);
    } else if (quantity > 0) {
      // Add new amenity
      setSelectedAmenities([...selectedAmenities, { id: amenityId, quantity }]);
    }
  };

  return (
    <>
      {/* Package Selection */}
      <div>
        <Form.Item label="Select a Package" name="packageId">
          <Select
            placeholder="Select a package"
            style={{ width: "100%" }}
            value={selectedPackage || undefined}
            onChange={handlePackageChange}
          >
            <Option value="">None</Option>
            {packages.map((pkg) => (
              <Option key={pkg.id} value={pkg.id}>
                {pkg.name} - ${pkg.price}
              </Option>
            ))}
          </Select>
          {selectedPackage && (
            <Text type="secondary">
              {packages.find((p) => p.id === selectedPackage)?.description}
            </Text>
          )}
        </Form.Item>
      </div>

      <Divider />

      {/* Amenities Selection */}
      <div>
        <Form.Item label="Add Optional Amenities" name="packageId">
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
                    <Text type="secondary">${amenity.price} each</Text>
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
                        max={amenity.maxQuantity}
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
                        disabled={quantity >= amenity.maxQuantity}
                      >
                        +
                      </Button>
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <Text type="secondary">Max: {amenity.maxQuantity}</Text>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Form.Item>
      </div>
    </>
  );
};

export default RoomReservationExtraForm;
