import {
  Button,
  Divider,
  Flex,
  Space,
  Typography,
  Modal,
  Descriptions,
  Tag,
  List,
  Card,
  Row,
  Col,
  Statistic,
  Avatar,
  Empty,
} from "antd";
import dayjs from "dayjs";
import {
  UserOutlined,
  DollarOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
  CoffeeOutlined,
  TeamOutlined,
  PrinterOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import usePrintContent from "../../hooks/common/usePrintContent";
import { useThemeContext } from "../../contexts/ThemeContext";

const { Title } = Typography;

const ViewRoomReservation = ({
  additionalData,
  viewModal,
  modulePrivileges,
  closeViewModal,
  handleEdit,
}) => {
  // React print configuration
  const { contentRef, printFn } = usePrintContent();
  const { isDarkMode } = useThemeContext();
  const { open, selectedObject: selectedReservation } = viewModal;

  // Helper function to find the label of the selected values
  const findLabelByValue = (array, value) =>
    array?.find((item) => item.value === value)?.label;

  // Get reservation type, status, and source labels
  const reservationType = findLabelByValue(
    additionalData?.reservationTypes,
    selectedReservation?.reservationTypeId
  );

  const reservationStatus = findLabelByValue(
    additionalData?.reservationStatus,
    selectedReservation?.roomReservationStatusId
  );

  // Get room package details
  const roomPackage = additionalData?.roomPackages?.find(
    (pkg) => pkg.id === selectedReservation?.roomPackageId
  );

  // Get primary guest details
  const primaryGuest = additionalData?.guests?.find(
    (guest) => guest.id === selectedReservation?.primaryGuestId
  );

  // Get additional guests details
  const additionalGuests = selectedReservation?.guestIds
    ?.map((id) => additionalData?.guests?.find((guest) => guest.id === id))
    .filter((guest) => guest?.id !== selectedReservation?.primaryGuestId);

  // Get amenities with their names
  const reservationAmenities = selectedReservation?.amenities?.map((item) => {
    const amenityDetail = additionalData?.amenities?.find(
      (a) => a.id === item.amenityId
    );
    return {
      ...item,
      name: amenityDetail?.name,
      price: amenityDetail?.price,
    };
  });

  // Format dates to readable strings
  const formatDate = (date) =>
    date ? dayjs(date).format("YYYY-MM-DD HH:mm") : "Not set";

  // Calculate stay duration
  const calculateNights = () => {
    if (
      selectedReservation?.reservedCheckInDate &&
      selectedReservation?.reservedCheckOutDate
    ) {
      let checkIn = dayjs(selectedReservation.reservedCheckInDate);
      let checkOut = dayjs(selectedReservation.reservedCheckOutDate);

      // Calculate nights (each night is from 14:00 to next day 10:00)
      let nights = checkOut.diff(checkIn, "day");
      if (nights < 0) return 0;
      // If checkOut is exactly at or after checkIn + 20 hours (14:00 to 10:00 next day), count as a night
      if (nights === 0 && checkOut.diff(checkIn, "hour") >= 20) {
        return 1;
      }
      return nights + 1;
    }
    return 0;
  };

  // Guest info section
  const guestInfo = [
    { key: "1", label: "Name", children: primaryGuest?.fullName },
    { key: "2", label: "Contact", children: primaryGuest?.mobileNo },
    { key: "3", label: "Email", children: primaryGuest?.email },
    { key: "4", label: "Note", children: selectedReservation?.note || "-" },
    {
      key: "5",
      label: "Total Guests",
      children: `${selectedReservation?.adultNo} Adults, ${selectedReservation?.childNo} Children, ${selectedReservation?.infantNo} Infants `,
    },
  ];

  // Billing info section
  const billing = selectedReservation?.billing?.[0];
  const billingInfo = billing
    ? [
        {
          key: "1",
          label: "Base Price",
          children: `${billing.basePrice?.toLocaleString("en-Lk", {
            style: "currency",
            currency: "LKR",
          })}`,
        },
        {
          key: "2",
          label: "Discount",
          children: `${billing.discount?.toLocaleString("en-Lk", {
            style: "currency",
            currency: "LKR",
          })}`,
        },
        {
          key: "3",
          label: "Total Tax",
          children: `${billing.totalTax?.toLocaleString("en-Lk", {
            style: "currency",
            currency: "LKR",
          })}`,
        },
      ]
    : [];

  // Get appropriate colors for status tags
  function getStatusColor(status) {
    if (!status) return "default";
    switch (status.toUpperCase()) {
      case "CHECKED-IN":
        return "green";
      case "CONFIRMED":
        return "blue";
      case "PENDING":
        return "orange";
      case "CHECKED-OUT":
        return "cyan";
      case "CANCELLED":
        return "red";
      case "NO-SHOW":
        return "volcano";
      default:
        return "default";
    }
  }

  function getPaymentStatusColor(status) {
    if (!status) return "default";
    switch (status.toUpperCase()) {
      case "PAID":
        return "green";
      case "PARTIALLY PAID":
        return "orange";
      case "PENDING":
        return "red";
      default:
        return "default";
    }
  }

  return (
    <Modal
      title={null}
      open={open}
      width={900}
      onCancel={closeViewModal}
      footer={null}
      styles={{
        header: { background: !isDarkMode ? "#f5f5f5" : "#1f1f1f" },
        content: { background: !isDarkMode ? "#f5f5f5" : "#1f1f1f" },
      }}
    >
      <div ref={contentRef}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Divider style={{ marginBottom: 0 }}>
              <Title level={4}>Reservation Details</Title>
            </Divider>
          </Col>
          {/* Reservation Summary */}
          <Col>
            <Card variant="borderless">
              <Row gutter={[16, 16]}>
                <Col xs={12} md={6}>
                  <Statistic
                    title="Check-In"
                    value={formatDate(selectedReservation?.reservedCheckInDate)}
                    prefix={<CalendarOutlined />}
                    valueStyle={{ fontSize: 15 }}
                  />
                </Col>
                <Col xs={12} md={6}>
                  <Statistic
                    title="Check-Out"
                    value={formatDate(
                      selectedReservation?.reservedCheckOutDate
                    )}
                    prefix={<CalendarOutlined />}
                    valueStyle={{ fontSize: 15 }}
                  />
                </Col>
                <Col xs={12} md={6}>
                  <Statistic
                    title="Duration"
                    value={calculateNights()}
                    suffix="nights"
                    valueStyle={{ color: "#1890ff", fontSize: 16 }}
                  />
                </Col>
                <Col xs={12} md={6}>
                  <Statistic
                    title="Reservation Type"
                    value={reservationType}
                    prefix={<InfoCircleOutlined />}
                    valueStyle={{ fontSize: 15 }}
                  />
                </Col>
                <Col xs={12} md={6}>
                  <Statistic
                    title="Actual Check-In"
                    value={formatDate(selectedReservation?.checkInDate)}
                    prefix={<CalendarOutlined />}
                    valueStyle={{ fontSize: 15 }}
                  />
                </Col>
                <Col xs={12} md={6}>
                  <Statistic
                    title="Actual Check-Out"
                    value={formatDate(selectedReservation?.checkOutDate)}
                    prefix={<CalendarOutlined />}
                    valueStyle={{ fontSize: 15 }}
                  />
                </Col>
                <Col xs={12} md={6}>
                  <Statistic
                    title="Room Package"
                    value={roomPackage?.name}
                    prefix={<HomeOutlined />}
                    valueStyle={{ fontSize: 15 }}
                  />
                </Col>
                <Col xs={12} md={6}>
                  <Statistic
                    title="Reservation Status"
                    value={reservationStatus}
                    valueStyle={{
                      color: getStatusColor(reservationStatus),
                      fontSize: 16,
                    }}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          {/* Guest */}
          <Col span={24}>
            <Card
              variant="borderless"
              title={
                <Space>
                  <UserOutlined /> Guest Information
                </Space>
              }
            >
              <Descriptions
                items={guestInfo}
                column={3}
                size="small"
                colon={false}
              />

              {/* Additional Guests */}
              {additionalGuests && additionalGuests.length > 0 && (
                <>
                  <Divider orientation="left">
                    <TeamOutlined /> Additional Guests
                  </Divider>
                  <List
                    grid={{ gutter: 8, column: 4 }}
                    dataSource={additionalGuests}
                    renderItem={(guest) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon={<UserOutlined />} />}
                          title={guest?.fullName}
                          description={guest?.mobileNo}
                        />
                      </List.Item>
                    )}
                  />
                </>
              )}
            </Card>
          </Col>

          {/* Amenities and Billing */}
          {reservationAmenities && reservationAmenities.length > 0 && (
            <Col span={24}>
              <Card
                variant="borderless"
                title={
                  <Space>
                    <CoffeeOutlined /> Room Amenities
                  </Space>
                }
              >
                <List
                  grid={{ gutter: 8, column: 4 }}
                  dataSource={reservationAmenities}
                  renderItem={(amenity) => (
                    <List.Item>
                      <Card size="small">
                        <Statistic
                          value={`${amenity.quantity} x ${amenity.name}`}
                          valueStyle={{ fontSize: 14 }}
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          )}

          <Col span={24}>
            <Card
              variant="borderless"
              title={
                <Space>
                  <DollarOutlined /> Billing Information
                </Space>
              }
              style={{ minHeight: 220 }}
            >
              {billing ? (
                <>
                  <Descriptions
                    items={billingInfo}
                    column={{ xs: 1, sm: 1 }}
                    size="small"
                    colon={false}
                    labelStyle={{ fontWeight: "500" }}
                  />
                  <Divider style={{ margin: "8px 0" }} />
                  <Flex justify="space-between">
                    <Statistic
                      title="Total Amount"
                      value={billing.totalPrice}
                      precision={2}
                      valueStyle={{ color: "#3f8600", fontSize: 16 }}
                      prefix="LKR "
                    />
                    <Statistic
                      title={
                        <Space>
                          Paid Amount
                          <Tag
                            color={getPaymentStatusColor(
                              billing.paymentStatus?.name
                            )}
                          >
                            {billing.paymentStatus?.name}
                          </Tag>
                        </Space>
                      }
                      value={billing.paidAmount}
                      precision={2}
                      valueStyle={{
                        color:
                          billing.paidAmount >= billing.totalPrice
                            ? "#3f8600"
                            : "#cf1322",
                        fontSize: 16,
                      }}
                      prefix="LKR "
                    />
                    <Statistic
                      title="Paid By"
                      value={billing?.paymentMethod?.name}
                      valueStyle={{ fontSize: 16 }}
                    />
                    <Statistic
                      title="Payment Date"
                      value={new Date(billing?.billingDate).toLocaleString(
                        "en-LK",
                        {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}
                      valueStyle={{ fontSize: 16 }}
                    />
                  </Flex>
                </>
              ) : (
                <Empty description="No billing information" />
              )}
            </Card>
          </Col>
        </Row>
      </div>

      <Divider />
      <Flex justify="space-between">
        {modulePrivileges?.update_privilege ? (
          <Button
            onClick={() => {
              closeViewModal();
              handleEdit(selectedReservation?.id);
            }}
            type="default"
          >
            Edit Reservation
          </Button>
        ) : (
          <span />
        )}
        <Space>
          <Button type="primary" onClick={printFn} icon={<PrinterOutlined />}>
            Print
          </Button>
        </Space>
      </Flex>
    </Modal>
  );
};

export default ViewRoomReservation;
