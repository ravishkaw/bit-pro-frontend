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
  Badge,
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

const { Title, Text } = Typography;

const ViewRoomReservation = ({
  additionalData,
  viewModal,
  modulePrivileges,
  closeViewModal,
  handleEdit,
  loadOneItem,
}) => {
  // React print configuration
  const { contentRef, printFn } = usePrintContent();
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
  const additionalGuests = selectedReservation?.guestId
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
      const checkIn = dayjs(selectedReservation.reservedCheckInDate);
      const checkOut = dayjs(selectedReservation.reservedCheckOutDate);
      return checkOut.diff(checkIn, "day");
    }
    return 0;
  };

  // Guest info section
  const guestInfo = [
    { key: "1", label: "Primary Guest", children: primaryGuest?.fullName },
    { key: "2", label: "Contact", children: primaryGuest?.mobileNo },
    { key: "3", label: "Email", children: primaryGuest?.email },
    { key: "4", label: "Note", children: selectedReservation?.note || "-" },
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
        {
          key: "4",
          label: "Payment Method",
          children: billing.paymentMethod?.name,
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
      case "PARTIAL":
        return "orange";
      case "UNPAID":
        return "red";
      default:
        return "default";
    }
  }

  return (
    <Modal
      title={
        <Flex align="center" gap="small">
          <CalendarOutlined />
          <span>Reservation Details</span>
          <Badge
            count={reservationStatus}
            style={{ backgroundColor: getStatusColor(reservationStatus) }}
          />
        </Flex>
      }
      open={open}
      width={900}
      onCancel={closeViewModal}
      footer={null}
      centered
    >
      <div ref={contentRef}>
        {/* Top reservation summary with 4 columns */}
        <Row gutter={[16, 16]}>
          <Card style={{ width: "100%" }}>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Statistic
                  title="Check-In"
                  value={formatDate(selectedReservation?.reservedCheckInDate)}
                  valueStyle={{ fontSize: "14px" }}
                  prefix={<CalendarOutlined />}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="Check-Out"
                  value={formatDate(selectedReservation?.reservedCheckOutDate)}
                  valueStyle={{ fontSize: "14px" }}
                  prefix={<CalendarOutlined />}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="Duration"
                  value={calculateNights()}
                  suffix="nights"
                  valueStyle={{ color: "#1890ff", fontSize: "16px" }}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="Room Package"
                  value={roomPackage?.name}
                  valueStyle={{ fontSize: "14px" }}
                  prefix={<HomeOutlined />}
                />
              </Col>
            </Row>
          </Card>

          {/* Main content - two rows with two cards each */}
          <Row gutter={[16, 16]}>
            {/* First row */}
            <Col span={18}>
              {/* Guest Information Card */}
              <Card
                title={
                  <>
                    <UserOutlined /> Guest Information
                  </>
                }
                style={{ height: "100%" }}
              >
                <Flex align="top">
                  <Avatar
                    icon={<UserOutlined />}
                    size={48}
                    style={{ marginRight: 16, backgroundColor: "#1890ff" }}
                  />
                  <Descriptions
                    items={guestInfo}
                    column={{ xs: 1, sm: 1, md: 1 }}
                    size="small"
                    colon={false}
                  />
                </Flex>

                <Row gutter={[8, 8]} style={{ marginTop: 16 }}>
                  <Col span={8}>
                    <Statistic
                      title="Adults"
                      value={selectedReservation?.adultNo}
                      valueStyle={{ fontSize: "16px" }}
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title="Children"
                      value={selectedReservation?.childNo}
                      valueStyle={{ fontSize: "16px" }}
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title="Infants"
                      value={selectedReservation?.infantNo}
                      valueStyle={{ fontSize: "16px" }}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col span={6}>
              {/* Reservation Details Card */}
              <Card
                title={
                  <>
                    <InfoCircleOutlined /> Reservation Status
                  </>
                }
                bordered
                style={{ height: "100%" }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Card
                      size="small"
                      title="Reserved"
                      bordered={false}
                      style={{ backgroundColor: "#f9f9f9" }}
                    >
                      <div>
                        Type: <Tag>{reservationType}</Tag>
                      </div>
                      <div style={{ marginTop: 8 }}>
                        Status:{" "}
                        <Tag color={getStatusColor(reservationStatus)}>
                          {reservationStatus}
                        </Tag>
                      </div>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card
                      size="small"
                      title="Actual Check-In/Out"
                      bordered={false}
                      style={{ backgroundColor: "#f9f9f9" }}
                    >
                      <div>
                        Check-In:{" "}
                        {formatDate(selectedReservation?.checkInDate) || (
                          <Text type="secondary">Not checked in yet</Text>
                        )}
                      </div>
                      <div style={{ marginTop: 8 }}>
                        Check-Out:{" "}
                        {formatDate(selectedReservation?.checkOutDate) || (
                          <Text type="secondary">Not checked out yet</Text>
                        )}
                      </div>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Col>

            {/* Second row */}
            <Col span={12}>
              {/* Amenities Card */}
              {reservationAmenities && reservationAmenities.length > 0 ? (
                <Card
                  title={
                    <>
                      <CoffeeOutlined /> Room Amenities
                    </>
                  }
                  bordered
                  style={{ height: "100%" }}
                >
                  <List
                    grid={{ gutter: 8, column: 2 }}
                    dataSource={reservationAmenities}
                    renderItem={(amenity) => (
                      <List.Item>
                        <Card size="small" style={{ height: "100%" }}>
                          <Statistic
                            title={amenity.name}
                            value={amenity.quantity}
                            suffix={`× $${amenity.price?.toFixed(2)}`}
                            valueStyle={{ fontSize: "14px" }}
                          />
                        </Card>
                      </List.Item>
                    )}
                  />
                </Card>
              ) : (
                <Card
                  title={
                    <>
                      <TeamOutlined /> Additional Guests
                    </>
                  }
                  bordered
                  style={{ height: "100%" }}
                >
                  {additionalGuests && additionalGuests.length > 0 ? (
                    <List
                      grid={{ gutter: 8, column: 2 }}
                      dataSource={additionalGuests}
                      renderItem={(guest) => (
                        <List.Item>
                          <Card size="small" style={{ height: "100%" }}>
                            <List.Item.Meta
                              avatar={<Avatar icon={<UserOutlined />} />}
                              title={guest?.fullName}
                              description={guest?.mobileNo}
                            />
                          </Card>
                        </List.Item>
                      )}
                    />
                  ) : (
                    <Empty
                      description="No additional guests"
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                  )}
                </Card>
              )}
            </Col>

            <Col span={12}>
              {/* Billing Card */}
              {billing ? (
                <Card
                  title={
                    <>
                      <DollarOutlined /> Billing Information
                    </>
                  }
                  bordered
                  style={{ height: "100%" }}
                >
                  <Row gutter={16}>
                    <Col span={14}>
                      <Descriptions
                        items={billingInfo}
                        column={{ xs: 1, sm: 1 }}
                        size="small"
                        colon={false}
                        labelStyle={{ fontWeight: "500" }}
                      />
                      <div style={{ marginTop: 8 }}>
                        <Text type="secondary">
                          Payment Date: {formatDate(billing.billingDate)}
                        </Text>
                      </div>
                    </Col>
                    <Col span={10}>
                      <Card
                        bordered={false}
                        style={{ backgroundColor: "#f9f9f9" }}
                        size="small"
                      >
                        <Statistic
                          title="Total Amount"
                          value={billing.totalPrice}
                          precision={2}
                          valueStyle={{ color: "#3f8600", fontSize: "16px" }}
                          prefix="$"
                        />
                        <Divider style={{ margin: "8px 0" }} />
                        <Statistic
                          title="Paid"
                          value={billing.paidAmount}
                          precision={2}
                          valueStyle={{
                            color:
                              billing.paidAmount >= billing.totalPrice
                                ? "#3f8600"
                                : "#cf1322",
                            fontSize: "16px",
                          }}
                          prefix="$"
                          suffix={
                            <Tag
                              color={getPaymentStatusColor(
                                billing.paymentStatus?.name
                              )}
                            >
                              {billing.paymentStatus?.name}
                            </Tag>
                          }
                        />
                      </Card>
                    </Col>
                  </Row>
                </Card>
              ) : (
                <Card
                  title={
                    <>
                      <CoffeeOutlined /> Room Amenities
                    </>
                  }
                  bordered
                  style={{ height: "100%" }}
                >
                  {reservationAmenities && reservationAmenities.length > 0 ? (
                    <List
                      grid={{ gutter: 8, column: 2 }}
                      dataSource={reservationAmenities}
                      renderItem={(amenity) => (
                        <List.Item>
                          <Card size="small">
                            <Statistic
                              title={amenity.name}
                              value={amenity.quantity}
                              suffix={`× $${amenity.price?.toFixed(2)}`}
                              valueStyle={{ fontSize: "14px" }}
                            />
                          </Card>
                        </List.Item>
                      )}
                    />
                  ) : (
                    <Empty
                      description="No amenities selected"
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                  )}
                </Card>
              )}
            </Col>

            {/* Show additional guests in third row if both billing and amenities exist */}
            {billing &&
              reservationAmenities &&
              reservationAmenities.length > 0 &&
              additionalGuests &&
              additionalGuests.length > 0 && (
                <Col span={24}>
                  <Card
                    title={
                      <>
                        <TeamOutlined /> Additional Guests
                      </>
                    }
                    bordered
                  >
                    <List
                      grid={{ gutter: 16, column: 4 }}
                      dataSource={additionalGuests}
                      renderItem={(guest) => (
                        <List.Item>
                          <Card size="small">
                            <List.Item.Meta
                              avatar={<Avatar icon={<UserOutlined />} />}
                              title={guest?.fullName}
                              description={guest?.mobileNo}
                            />
                          </Card>
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
              )}
          </Row>
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
          <span></span>
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
