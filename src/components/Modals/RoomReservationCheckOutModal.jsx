import { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Row,
  Col,
  Card,
  Typography,
  Divider,
  Space,
  Statistic,
  Select,
  Flex,
  Alert,
} from "antd";
import {
  CheckCircleOutlined,
  DollarOutlined,
  CalendarOutlined,
  UserOutlined,
  MobileOutlined,
  MailOutlined,
  MoonOutlined,
  BookOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import { useThemeContext } from "../../contexts/ThemeContext";
import { toast } from "react-toastify";
import { checkOutRoomReservationPricing } from "../../services/roomReservationApiService";

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

  // Get primary guest details
  const primaryGuest = guests?.find(
    (guest) => guest.id === selectedReservation?.primaryGuestId
  );
  // Format dates to readable strings
  const formatDate = (date) =>
    date ? dayjs(date).format("YYYY-MM-DD HH:mm") : "Not set";

  // Calculate room reservation pricing
  const checkOutPricing = async (reservationId) => {
    setPricingLoading(true);
    try {
      const pricingData = await checkOutRoomReservationPricing(reservationId);
      setPricingInformation(pricingData);
      console.log(pricingData);
    } catch (error) {
      console.error("Error calculating checkout pricing:", error);
      toast.error("Error calculating checkout pricing. Please try again.");
    } finally {
      setPricingLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      checkOutPricing(selectedReservation?.id);
    }
  }, [open, selectedReservation]);

  useEffect(() => {
    if (open && pricingInformation) {
      form.setFieldsValue({
        paymentMethodId: selectedReservation?.billing?.paymentMethodId,
        paidAmount: pricingInformation?.paidAmount,
      });
      setCheckOutDate(dayjs(pricingInformation?.checkOutDate || new Date()));
      setPaidAmount(pricingInformation?.paidAmount || 0);
    }
  }, [pricingInformation, open, form, selectedReservation?.billing]);

  useEffect(() => {
    if (pricingInformation && paidAmount) {
      const remaining = pricingInformation.netAmount - paidAmount;
      setRemainingAmount(remaining);
    } else if (pricingInformation) {
      setRemainingAmount(pricingInformation.netAmount);
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
      billingPayloadDTO: {
        id: selectedReservation?.billing.id,
        basePrice: Math.ceil(pricingInformation.basePrice) || values.basePrice,
        totalPrice: Math.ceil(pricingInformation.totalPrice),
        discountId: pricingInformation.discountId,
        discountAmount: Math.ceil(pricingInformation.discountAmount),
        taxId: pricingInformation.taxId,
        totalTax: Math.ceil(pricingInformation.totalTax),
        paidAmount: Math.ceil(values.paidAmount),
        paymentMethodId: values.paymentMethodId,
      },
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
                      value={pricingInformation?.totalNights || 0}
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
                {/* Alert for remaining or refund */}
                {remainingAmount > 0 && (
                  <Alert
                    message="Please settle the remaining amount before checkout."
                    type="warning"
                    showIcon
                    style={{ marginBottom: 16 }}
                  />
                )}
                {remainingAmount < 0 && (
                  <Alert
                    message={`Refund due: ${Math.abs(
                      remainingAmount
                    ).toLocaleString("en-LK", {
                      style: "currency",
                      currency: "LKR",
                    })}`}
                    description="The guest has overpaid. Please process the refund."
                    type="info"
                    showIcon
                    style={{ marginBottom: 16 }}
                  />
                )}
                {remainingAmount === 0 && (
                  <Alert
                    message="All payments are settled. Good to proceed with checkout."
                    type="success"
                    showIcon
                    style={{ marginBottom: 16 }}
                  />
                )}
                <Title level={5}>
                  <DollarOutlined style={{ marginRight: "8px" }} />
                  Checkout Summary
                </Title>
              </Col>
              <Col span={8}>
                <Statistic
                  title="Net Amount"
                  value={pricingInformation?.netAmount}
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
                  title={
                    remainingAmount > 0
                      ? "Remaining Amount"
                      : remainingAmount === 0
                      ? "No Remaining Amount"
                      : "Refund Amount"
                  }
                  value={remainingAmount}
                  precision={0}
                  formatter={(value) =>
                    Math.ceil(value).toLocaleString("en-LK", {
                      style: "currency",
                      currency: "LKR",
                    })
                  }
                  valueStyle={{
                    color:
                      remainingAmount > 0
                        ? "#cf1322"
                        : remainingAmount === 0
                        ? "#52c41a"
                        : "#faad14",
                  }}
                />
              </Col>
            </Row>
            {pricingInformation?.additionalNotes && (
              <>
                <Divider />
                <Col span={24}>
                  <Title level={5}>
                    <BookOutlined style={{ marginRight: "8px" }} />
                    Additional Notes
                  </Title>
                </Col>
                <Col span={24}>
                  <Text style={{ whiteSpace: "pre-line" }}>
                    {pricingInformation.additionalNotes}
                  </Text>
                </Col>
              </>
            )}

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
                      disabled={remainingAmount !== 0}
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
