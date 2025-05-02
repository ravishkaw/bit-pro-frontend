import { useState, useEffect } from "react";
import {
  Typography,
  Select,
  Card,
  Flex,
  Button,
  Space,
  Row,
  Col,
  Form,
  Input,
  Divider,
  Statistic,
} from "antd";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const RoomPaymentForm = ({
  isEditing,
  form,
  setCurrent,
  prev,
  additionalData,
  confirmLoading,
  pricingLoading,
  pricingInformation,
}) => {
  const [paidAmount, setPaidAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);

  const { reservationStatus, paymentMethods, paymentStatuses } = additionalData;

  useEffect(() => {
    if (pricingInformation && paidAmount) {
      const remaining = pricingInformation.totalPrice - paidAmount;
      setRemainingAmount(remaining > 0 ? remaining : 0);
    } else if (pricingInformation) {
      setRemainingAmount(pricingInformation.totalPrice);
    }
  }, [pricingInformation, paidAmount]);

  const handlePaidAmountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setPaidAmount(value);
  };

  return (
    <>
      {pricingLoading ? (
        <Card loading={true} />
      ) : pricingInformation ? (
        <Card style={{ marginBottom: 16 }}>
          <Title level={4}>Payment Summary</Title>

          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Title level={5}>Booking Details</Title>
              <Paragraph>
                <Text strong>Check-in Date:</Text>{" "}
                {pricingInformation.checkInDate}
              </Paragraph>
              <Paragraph>
                <Text strong>Check-out Date:</Text>{" "}
                {pricingInformation.checkOutDate}
              </Paragraph>
              <Paragraph>
                <Text strong>Room ID:</Text> {pricingInformation.roomId}
              </Paragraph>
              <Paragraph>
                <Text strong>Package ID:</Text>{" "}
                {pricingInformation.roomPackageId}
              </Paragraph>
            </Col>

            <Col span={8}>
              <Title level={5}>Price Breakdown</Title>
              <Paragraph>
                <Text strong>Base Price:</Text>{" "}
                {pricingInformation?.basePrice?.toLocaleString("en-LK", {
                  style: "currency",
                  currency: "LKR",
                })}
              </Paragraph>
              <Paragraph>
                <Text strong>Discount:</Text>{" "}
                {pricingInformation?.discount?.toLocaleString("en-LK", {
                  style: "currency",
                  currency: "LKR",
                })}
              </Paragraph>
              <Paragraph>
                <Text strong>Taxes:</Text>{" "}
                {pricingInformation?.totalTaxes?.toLocaleString("en-LK", {
                  style: "currency",
                  currency: "LKR",
                })}
              </Paragraph>

              {pricingInformation.amenities &&
                pricingInformation.amenities.length > 0 && (
                  <>
                    <Title level={5}>Additional Amenities</Title>
                    {pricingInformation?.amenities.map((amenity, index) => (
                      <Paragraph key={index}>
                        <Text strong>Amenity {amenity.amenityId}:</Text>{" "}
                        Quantity: {amenity.quantity}
                      </Paragraph>
                    ))}
                  </>
                )}
            </Col>

            <Col span={8}>
              <Statistic
                title="Total Price"
                value={pricingInformation?.totalPrice}
                precision={2}
                formatter={(value) =>
                  value.toLocaleString("en-LK", {
                    style: "currency",
                    currency: "LKR",
                  })
                }
                valueStyle={{ color: "#3f8600", fontWeight: "bold" }}
              />
              <Statistic
                title="Paid Amount"
                value={paidAmount}
                precision={2}
                formatter={(value) =>
                  value?.toLocaleString("en-LK", {
                    style: "currency",
                    currency: "LKR",
                  })
                }
                valueStyle={{ color: "#1677ff" }}
              />
              <Statistic
                title="Remaining Balance"
                value={remainingAmount}
                precision={2}
                formatter={(value) =>
                  value?.toLocaleString("en-LK", {
                    style: "currency",
                    currency: "LKR",
                  })
                }
                valueStyle={{
                  color: remainingAmount > 0 ? "#cf1322" : "#3f8600",
                }}
              />
            </Col>
          </Row>

          <Divider />

          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item
                label="Payment Amount"
                name="paidAmount"
                rules={[
                  {
                    required: true,
                    message: "Please enter the payment amount",
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder="Enter payment amount"
                  onChange={handlePaidAmountChange}
                  prefix="Rs."
                  suffix="LKR"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Payment Method"
                name="paymentMethodId"
                rules={[
                  {
                    required: true,
                    message: "Please select the payment method",
                  },
                ]}
              >
                <Select
                  placeholder="Select payment method"
                  showSearch
                  options={paymentMethods}
                  optionFilterProp="label"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Reservation Status"
                name="roomReservationStatusId"
                rules={[
                  {
                    required: true,
                    message: "Please select the reservation status",
                  },
                ]}
              >
                <Select
                  placeholder="Select reservation status"
                  showSearch
                  options={reservationStatus}
                  optionFilterProp="label"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      ) : (
        <Card style={{ marginBottom: 16 }}>
          <Title level={5}>No pricing information available</Title>
        </Card>
      )}

      <Flex
        justify={isEditing ? "end" : "space-between"}
        style={{ marginTop: 16 }}
      >
        {!isEditing && (
          <Button
            color="default"
            variant="dashed"
            onClick={() => {
              form.resetFields();
              setCurrent(0);
            }}
          >
            Reset
          </Button>
        )}
        <Space>
          <Button onClick={prev}>Previous</Button>
          <Button
            color={isEditing ? "primary" : "green"}
            variant="solid"
            htmlType="submit"
            loading={confirmLoading}
          >
            {isEditing ? "Update" : "Submit"}
          </Button>
        </Space>
      </Flex>
    </>
  );
};
export default RoomPaymentForm;
