import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Row,
  Col,
  Card,
  Typography,
  Divider,
  Space,
  notification,
  Descriptions,
  Statistic,
  Tag,
  Select,
  Flex,
} from "antd";
import {
  CheckCircleOutlined,
  DollarOutlined,
  CalendarOutlined,
  UserOutlined,
  MobileOutlined,
  MailOutlined,
  MoonOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import { calculateRoomReservationPrice } from "../../utils/pricing";
import { useThemeContext } from "../../contexts/ThemeContext";
import { toast } from "react-toastify";

const { Title, Text } = Typography;

const RoomReservationCheckOutModal = ({
  modalState,
  closeModal,
  additionalData,
  roomCheckout,
}) => {
  const [loading, setLoading] = useState(false);
  const [pricingLoading, setPricingLoading] = useState(false);
  const [pricingInformation, setPricingInformation] = useState({});
  const [paidAmount, setPaidAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [form] = Form.useForm();

  const { isDarkMode } = useThemeContext();

  const { open, selectedReservation } = modalState;
  const { guests, paymentMethods } = additionalData;

  const billing = selectedReservation?.billing?.[0] || {};

  // Get primary guest details
  const primaryGuest = guests?.find(
    (guest) => guest.id === selectedReservation?.primaryGuestId
  );
  // Format dates to readable strings
  const formatDate = (date) =>
    date ? dayjs(date).format("YYYY-MM-DD HH:mm") : "Not set";

  // Calculate total nights based on check-in and check-out dates
  const calculateTotalNights = (checkInDate, checkOutDate) => {
    if (!checkInDate) return 0;

    const startDate = dayjs(checkInDate);
    const endDate = dayjs(checkOutDate || new Date());
    let nights = endDate.diff(startDate, "day");
    if (nights < 0) return 0;
    if (nights === 0 && endDate.diff(startDate, "hour") >= 20) {
      return 1;
    }
    return nights + 1;
  };

  // Calculate room reservation pricing
  const calculatePricing = async () => {
    try {
      const roomId = selectedReservation?.roomId;
      const checkInDate = dayjs(selectedReservation?.checkInDate);
      const checkOutDate = dayjs(new Date());
      const selectedPackage = selectedReservation?.roomPackageId;
      const selectedAmenities = selectedReservation?.amenities || [];
      setCheckOutDate(checkOutDate);

      calculateRoomReservationPrice(
        roomId,
        checkInDate,
        checkOutDate,
        selectedAmenities,
        selectedPackage,
        setPricingLoading,
        setPricingInformation
      );
    } catch (error) {
      console.error("Error calculating pricing:", error);
      toast.error("Error calculating pricing. Please try again.");
    }
  };

  useEffect(() => {
    if (open) {
      try {
        calculatePricing();

        form.setFieldsValue({
          paymentMethodId: billing?.paymentMethod?.id,
          paidAmount: billing?.paidAmount,
        });
        setPaidAmount(billing?.paidAmount || 0);
      } catch (error) {
        toast.error("Error calculating pricing. Please try again.");
      }
    }
  }, [open, selectedReservation, form]);

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

  const handleCheckout = async () => {
    setLoading(true);

    const values = await form.validateFields();

    const updateData = {
      checkOutDate: checkOutDate.format("YYYY-MM-DDTHH:mm:ss"),
      billingPayloadDTO: [
        {
          id: selectedReservation.billing?.[0]?.id,
          basePrice:
            Math.ceil(pricingInformation.basePrice) || values.basePrice,
          totalTaxes:
            Math.ceil(pricingInformation.totalTaxes) || values.totalTax,
          totalPrice:
            Math.ceil(pricingInformation.totalPrice) || values.totalPrice,
          discount: Math.ceil(pricingInformation.discount) || values.discount,
          paidAmount: Math.ceil(values.paidAmount),
          paymentMethodId: values.paymentMethodId,
        },
      ],
    };
    await roomCheckout(selectedReservation?.id, updateData);
    setLoading(false);
    closeModal();
  };

  return (
    <Modal
      title={null}
      open={open}
      onCancel={closeModal}
      footer={null}
      width={900}
      closable={false}
      destroyOnClose
      styles={{
        header: { background: !isDarkMode ? "#f5f5f5" : "#1f1f1f" },
        content: { background: !isDarkMode ? "#f5f5f5" : "#1f1f1f" },
      }}
    >
      <div style={{ position: "absolute", top: 36, left: 40, zIndex: 1 }}>
        <Space>
          <CheckCircleOutlined style={{ color: "#52c41a" }} />
          <Text type="secondary">#Reservation {selectedReservation?.id}</Text>
        </Space>
      </div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card variant="borderless">
            <Row gutter={[16, 24]}>
              <Col span={24}>
                <Divider style={{ marginBottom: 0 }}>
                  <Title level={4}>
                    <CalendarOutlined style={{ marginRight: "8px" }} />
                    Reservation Details
                  </Title>
                </Divider>
              </Col>

              <Col span={24}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={8}>
                    <Statistic
                      title="Name"
                      value={primaryGuest?.fullName || "N/A"}
                      prefix={<UserOutlined />}
                      valueStyle={{ fontSize: 15 }}
                    />
                  </Col>
                  <Col xs={24} sm={8}>
                    <Statistic
                      title="Contact"
                      value={primaryGuest?.mobileNo || "N/A"}
                      prefix={<MobileOutlined />}
                      valueStyle={{ fontSize: 15 }}
                      formatter={(value) => {
                        if (!value || value === "N/A") return "N/A";
                        return String(value);
                      }}
                    />
                  </Col>
                  <Col xs={24} sm={8}>
                    <Statistic
                      title="Email"
                      value={primaryGuest?.email || "N/A"}
                      prefix={<MailOutlined />}
                      valueStyle={{ fontSize: 15 }}
                    />
                  </Col>
                </Row>
              </Col>

              <Col span={24}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={8}>
                    <Statistic
                      title="Check-In"
                      value={formatDate(selectedReservation?.checkInDate)}
                      prefix={<CalendarOutlined />}
                      valueStyle={{ fontSize: 15 }}
                    />
                  </Col>
                  <Col xs={24} sm={8}>
                    <Statistic
                      title="Check-Out"
                      value={formatDate(checkOutDate)}
                      prefix={<CalendarOutlined />}
                      valueStyle={{ fontSize: 15 }}
                    />
                  </Col>
                  <Col xs={24} sm={8}>
                    <Statistic
                      title="Total Nights"
                      value={calculateTotalNights(
                        selectedReservation?.checkInDate,
                        new Date()
                      )}
                      prefix={<MoonOutlined />}
                      valueStyle={{ fontSize: 15 }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider />

            <Row gutter={16}>
              <Col span={24}>
                <Title level={5}>
                  <DollarOutlined style={{ marginRight: "8px" }} />
                  Checkout Summary
                </Title>
              </Col>

              <Col span={8}>
                <Statistic
                  title="Total Price"
                  value={pricingInformation?.totalPrice}
                  precision={0}
                  formatter={(value) =>
                    Math.ceil(value).toLocaleString("en-LK", {
                      style: "currency",
                      currency: "LKR",
                    })
                  }
                  valueStyle={{ color: "#3f8600", fontWeight: "bold" }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Paid Amount"
                  value={paidAmount}
                  precision={0}
                  formatter={(value) =>
                    Math.ceil(value).toLocaleString("en-LK", {
                      style: "currency",
                      currency: "LKR",
                    })
                  }
                  valueStyle={{ color: "#1677ff" }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Remaining Balance"
                  value={remainingAmount}
                  precision={0}
                  formatter={(value) =>
                    Math.ceil(value).toLocaleString("en-LK", {
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

            <Row gutter={16}>
              <Col span={24}>
                <Form form={form} layout="vertical" onFinish={handleCheckout}>
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
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
                    <Col span={12}>
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
                          placeholder="0.00"
                          onChange={handlePaidAmountChange}
                          prefix="Rs."
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Flex justify="end" gap={16}>
                    <Button onClick={closeModal}>Cancel</Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      icon={<CheckCircleOutlined />}
                    >
                      Complete Checkout
                    </Button>
                  </Flex>
                </Form>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

export default RoomReservationCheckOutModal;
