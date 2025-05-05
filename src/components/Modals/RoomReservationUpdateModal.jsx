import { useEffect, useState } from "react";
import {
  Form,
  Modal,
  Button,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Card,
  Typography,
  Divider,
  Space,
  Spin,
  Tag,
  Alert,
  Descriptions,
} from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  HomeOutlined,
  CoffeeOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { getChangedFieldValues } from "../../utils/form";

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const RoomReservationUpdateModal = ({
  open,
  closeFormModal,
  selectedObject,
  additionalData,
  updateItem,
  loadReferenceData,
  showUpdateConfirmModal,
  fetchRooms,
  checkRoomReservationPricing,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [pricingInformation, setPricingInformation] = useState({});
  const [pricingLoading, setPricingLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  // Format dates for form
  const formatDateForForm = (dateString) => {
    return dateString ? dayjs(dateString) : null;
  };

  // Load initial form data when modal opens
  useEffect(() => {
    if (selectedObject && open) {
      setLoading(true);

      // Format amenities for the form
      const formattedAmenities =
        selectedObject.amenities?.map((item) => ({
          id: item.amenityId,
          quantity: item.quantity,
        })) || [];

      setSelectedAmenities(formattedAmenities);

      // Format dates for the form
      const checkIn = formatDateForForm(selectedObject.reservedCheckInDate);
      const checkOut = formatDateForForm(selectedObject.reservedCheckOutDate);
      const actualCheckIn = formatDateForForm(selectedObject.checkInDate);
      const actualCheckOut = formatDateForForm(selectedObject.checkOutDate);

      // Format billing for the form
      const billing = selectedObject.billing?.[0] || {};

      // Set form fields
      const formValues = {
        ...selectedObject,
        reservationDateRange: checkIn && checkOut ? [checkIn, checkOut] : null,
        actualCheckInDate: actualCheckIn,
        actualCheckOutDate: actualCheckOut,
        paymentMethodId: billing.paymentMethod?.id,
        paidAmount: billing.paidAmount || 0,
        basePrice: billing.basePrice || 0,
        totalTax: billing.totalTax || 0,
        discount: billing.discount || 0,
        totalPrice: billing.totalPrice || 0,
        childIds: selectedObject.childId?.map((id) => ({ id })) || [],
      };

      setInitialValues(formValues);
      form.setFieldsValue(formValues);
      setPricingInformation({
        basePrice: billing.basePrice || 0,
        totalTaxes: billing.totalTax || 0,
        discount: billing.discount || 0,
        totalPrice: billing.totalPrice || 0,
      });

      // Load available rooms based on current reservation
      loadAvailableRooms(selectedObject);

      setLoading(false);
    }
  }, [selectedObject, open, form]);

  // Load available rooms
  const loadAvailableRooms = async (reservation) => {
    try {
      const checkInDate = dayjs(reservation.reservedCheckInDate).format(
        "YYYY-MM-DD"
      );
      const checkOutDate = dayjs(reservation.reservedCheckOutDate).format(
        "YYYY-MM-DD"
      );

      const rooms = await fetchRooms(
        checkInDate,
        checkOutDate,
        reservation.adultNo,
        reservation.childNo,
        reservation.infantNo
      );

      // Include the currently assigned room even if not available
      const currentRoomExists = rooms.some(
        (room) => room.id === reservation.roomId
      );

      if (!currentRoomExists) {
        // Get the room details or create a placeholder
        const currentRoom = {
          id: reservation.roomId,
          roomNumber: "Current Room",
        };

        setAvailableRooms([...rooms, currentRoom]);
      } else {
        setAvailableRooms(rooms);
      }
    } catch (error) {
      console.error("Error loading available rooms:", error);
    }
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

  // Refresh pricing
  const refreshPricing = async () => {
    setPricingLoading(true);
    try {
      const values = await form.validateFields([
        "roomId",
        "reservationDateRange",
        "roomPackageId",
      ]);

      // Extract values needed for pricing calculation
      const roomId = values.roomId;
      const checkInDate =
        values.reservationDateRange[0].format("YYYY-MM-DD") + "T14:00:00";
      const checkOutDate =
        values.reservationDateRange[1].format("YYYY-MM-DD") + "T10:00:00";
      const packageId = values.roomPackageId;

      // Format amenities for pricing request
      const amenitiesForPricing = selectedAmenities.map((amenity) => ({
        amenityId: amenity.id,
        quantity: amenity.quantity,
      }));

      const pricingData = await checkRoomReservationPricing({
        roomId: roomId,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        roomPackageId: packageId,
        amenities: amenitiesForPricing,
      });

      setPricingInformation(pricingData);
    } catch (error) {
      console.error("Error calculating pricing:", error);
    } finally {
      setPricingLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      // Format data for API
      const updateData = {
        ...values,
        reservedCheckInDate:
          values.reservationDateRange[0].format("YYYY-MM-DD") + "T14:00:00",
        reservedCheckOutDate:
          values.reservationDateRange[1].format("YYYY-MM-DD") + "T10:00:00",
        checkInDate: values.actualCheckInDate
          ? values.actualCheckInDate.format("YYYY-MM-DD") + "T14:00:00"
          : null,
        checkOutDate: values.actualCheckOutDate
          ? values.actualCheckOutDate.format("YYYY-MM-DD") + "T10:00:00"
          : null,
        amenities: selectedAmenities.map((amenity) => ({
          amenityId: amenity.id,
          quantity: amenity.quantity,
        })),
        childIds: values.childIds?.map((child) => child.id) || [],
        billingPayloadDTO: [
          {
            basePrice: pricingInformation.basePrice || values.basePrice,
            totalTaxes: pricingInformation.totalTaxes || values.totalTax,
            totalPrice: pricingInformation.totalPrice || values.totalPrice,
            discount: pricingInformation.discount || values.discount,
            paidAmount: values.paidAmount,
            paymentMethodId: values.paymentMethodId,
          },
        ],
      };

      // Remove extra fields
      delete updateData.reservationDateRange;
      delete updateData.actualCheckInDate;
      delete updateData.actualCheckOutDate;
      delete updateData.billing;
      delete updateData.basePrice;
      delete updateData.totalTax;
      delete updateData.discount;
      delete updateData.totalPrice;

      // Check what fields have changed
      const changedFields = getChangedFieldValues(initialValues, updateData);

      // Show confirmation modal with changed fields
      showUpdateConfirmModal(changedFields, selectedObject.id, updateData);
    } catch (error) {
      console.error("Form validation error:", error);
    }
  };
  // Format currency
  const formatCurrency = (amount) => {
    return (
      amount?.toLocaleString("en-LK", {
        style: "currency",
        currency: "LKR",
      }) || "LKR 0.00"
    );
  };

  return (
    <Modal
      title={
        <>
          <CalendarOutlined /> Update Room Reservation
        </>
      }
      open={open}
      onCancel={closeFormModal}
      width={900}
      footer={null}
      maskClosable={false}
      destroyOnClose
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {/* Reservation dates and guests */}
          <Card
            title={
              <>
                <CalendarOutlined /> Reservation Details
              </>
            }
            style={{ marginBottom: 16 }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Reservation Date Range"
                  name="reservationDateRange"
                  rules={[
                    {
                      required: true,
                      message: "Please select reservation dates",
                    },
                  ]}
                >
                  <DatePicker.RangePicker
                    style={{ width: "100%" }}
                    format="YYYY-MM-DD"
                    disabledDate={(current) =>
                      current && current < dayjs().startOf("day")
                    }
                    onChange={(dates) => {
                      if (dates) {
                        form
                          .validateFields(["adultNo", "childNo", "infantNo"])
                          .then((values) => {
                            fetchRooms(
                              dates[0].format("YYYY-MM-DD"),
                              dates[1].format("YYYY-MM-DD"),
                              values.adultNo,
                              values.childNo,
                              values.infantNo
                            ).then((rooms) => setAvailableRooms(rooms));
                          });
                      }
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Adults"
                  name="adultNo"
                  rules={[{ required: true, message: "Required" }]}
                >
                  <InputNumber min={1} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Children"
                  name="childNo"
                  rules={[{ required: true, message: "Required" }]}
                >
                  <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Infants"
                  name="infantNo"
                  rules={[{ required: true, message: "Required" }]}
                >
                  <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Actual Check-in/Check-out">
                  <Row gutter={8}>
                    <Col span={12}>
                      <Form.Item name="actualCheckInDate" noStyle>
                        <DatePicker
                          placeholder="Actual Check-in"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="actualCheckOutDate" noStyle>
                        <DatePicker
                          placeholder="Actual Check-out"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Room"
                  name="roomId"
                  rules={[{ required: true, message: "Please select a room" }]}
                >
                  <Select placeholder="Select room">
                    {availableRooms.map((room) => (
                      <Option key={room.id} value={room.id}>
                        Room - {room.number}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Room Package"
                  name="roomPackageId"
                  rules={[
                    { required: true, message: "Please select a package" },
                  ]}
                >
                  <Select placeholder="Select package">
                    {additionalData.roomPackages.map((pkg) => (
                      <Option key={pkg.id} value={pkg.id}>
                        {pkg.name} - {formatCurrency(pkg.price)}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Card>

          {/* Guest Information */}
          <Card
            title={
              <>
                <UserOutlined /> Guest Information
              </>
            }
            style={{ marginBottom: 16 }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Primary Guest"
                  name="primaryGuestId"
                  rules={[
                    { required: true, message: "Please select primary guest" },
                  ]}
                >
                  <Select placeholder="Select primary guest">
                    {additionalData.guests.map((guest) => (
                      <Option key={guest.id} value={guest.id}>
                        {guest.fullName} - {guest.email}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Additional Guests" name="guestId">
                  <Select
                    mode="multiple"
                    placeholder="Select additional guests"
                    optionFilterProp="children"
                  >
                    {additionalData.guests.map((guest) => (
                      <Option key={guest.id} value={guest.id}>
                        {guest.fullName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Children" name="childIds">
                  <Select
                    mode="multiple"
                    placeholder="Select children"
                    optionFilterProp="children"
                    labelInValue
                  >
                    {additionalData.children.map((child) => (
                      <Option key={child.id} value={child.id}>
                        {child.fullName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Reservation Type"
                  name="reservationTypeId"
                  rules={[
                    {
                      required: true,
                      message: "Please select reservation type",
                    },
                  ]}
                >
                  <Select placeholder="Select type">
                    {additionalData.reservationTypes.map((type) => (
                      <Option key={type.value} value={type.value}>
                        {type.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Status"
                  name="roomReservationStatusId"
                  rules={[{ required: true, message: "Please select status" }]}
                >
                  <Select placeholder="Select status">
                    {additionalData.reservationStatus.map((status) => (
                      <Option key={status.value} value={status.value}>
                        {status.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Note" name="note">
                  <TextArea rows={2} placeholder="Special requests or notes" />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          {/* Amenities */}
          <Card
            title={
              <>
                <CoffeeOutlined /> Amenities
              </>
            }
            style={{ marginBottom: 16 }}
          >
            <Row gutter={[16, 16]}>
              {additionalData.amenities.map((amenity) => {
                const selectedAmenity = selectedAmenities.find(
                  (a) => a.id === amenity.id
                );
                const quantity = selectedAmenity ? selectedAmenity.quantity : 0;

                return (
                  <Col span={6} key={amenity.id}>
                    <Card size="small" style={{ height: "100%" }}>
                      <div style={{ fontWeight: "bold", marginBottom: 8 }}>
                        {amenity.name}
                      </div>
                      <div style={{ color: "#777", marginBottom: 8 }}>
                        {formatCurrency(amenity.price)} each
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Button
                          size="small"
                          onClick={() =>
                            handleAmenityQuantityChange(
                              amenity.id,
                              quantity - 1
                            )
                          }
                          disabled={quantity <= 0}
                        >
                          -
                        </Button>
                        <InputNumber
                          size="small"
                          min={0}
                          max={10}
                          value={quantity}
                          onChange={(val) =>
                            handleAmenityQuantityChange(amenity.id, val)
                          }
                          style={{ width: 50, margin: "0 8px" }}
                        />
                        <Button
                          size="small"
                          onClick={() =>
                            handleAmenityQuantityChange(
                              amenity.id,
                              quantity + 1
                            )
                          }
                          disabled={quantity >= 10}
                        >
                          +
                        </Button>
                      </div>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Card>

          {/* Payment Information */}
          <Card
            title={
              <>
                <DollarOutlined /> Payment Information
              </>
            }
            style={{ marginBottom: 16 }}
            extra={
              <Button
                onClick={() =>
                  form
                    .validateFields(["roomPackageId"])
                    .then(() => refreshPricing())
                }
              >
                Recalculate Price
              </Button>
            }
          >
            <Row gutter={16}>
              <Col span={24}>
                <Descriptions
                  size="small"
                  column={{ xs: 1, sm: 2, md: 4 }}
                  labelStyle={{ fontWeight: "bold" }}
                >
                  <Descriptions.Item label="Base Price">
                    <Form.Item name="basePrice" noStyle>
                      <InputNumber
                        disabled
                        style={{ width: "100%" }}
                        formatter={(value) =>
                          `LKR ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/LKR\s?|(,*)/g, "")}
                      />
                    </Form.Item>
                  </Descriptions.Item>
                  <Descriptions.Item label="Discount">
                    <Form.Item name="discount" noStyle>
                      <InputNumber
                        disabled
                        style={{ width: "100%" }}
                        formatter={(value) =>
                          `LKR ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/LKR\s?|(,*)/g, "")}
                      />
                    </Form.Item>
                  </Descriptions.Item>
                  <Descriptions.Item label="Tax">
                    <Form.Item name="totalTax" noStyle>
                      <InputNumber
                        disabled
                        style={{ width: "100%" }}
                        formatter={(value) =>
                          `LKR ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/LKR\s?|(,*)/g, "")}
                      />
                    </Form.Item>
                  </Descriptions.Item>
                  <Descriptions.Item label="Total">
                    <Form.Item name="totalPrice" noStyle>
                      <InputNumber
                        disabled
                        style={{ width: "100%" }}
                        className="pricing-total"
                        formatter={(value) =>
                          `LKR ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/LKR\s?|(,*)/g, "")}
                      />
                    </Form.Item>
                  </Descriptions.Item>
                </Descriptions>

                <div style={{ marginTop: 16 }}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label="Payment Method"
                        name="paymentMethodId"
                        rules={[{ required: true }]}
                      >
                        <Select placeholder="Select payment method">
                          {additionalData.paymentMethods.map((method) => (
                            <Option key={method.value} value={method.value}>
                              {method.label}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Amount Paid"
                        name="paidAmount"
                        rules={[{ required: true }]}
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          formatter={(value) =>
                            `LKR ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          parser={(value) => value.replace(/LKR\s?|(,*)/g, "")}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Card>

          <Divider />

          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <Space>
                <Button onClick={closeFormModal}>Cancel</Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Update Reservation
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Modal>
  );
};

export default RoomReservationUpdateModal;
