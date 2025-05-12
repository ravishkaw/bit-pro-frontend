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
  Space,
  Descriptions,
  Tooltip,
  Flex,
  Alert as AntdAlert,
} from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  CoffeeOutlined,
  DollarOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import { useThemeContext } from "../../contexts/ThemeContext";
import {
  getChangedFieldValues,
  triggerFormFieldsValidation,
} from "../../utils/form";
import { formValidations } from "./validations";
import { mapToSelectOptions } from "../../utils/utils";
import { calculateRoomReservationPrice } from "../../utils/pricing";

const { Option } = Select;
const { TextArea } = Input;

const RoomReservationUpdateForm = ({
  open,
  closeFormModal,
  selectedObject,
  additionalData,
  showUpdateConfirmModal,
  fetchRooms,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [pricingInformation, setPricingInformation] = useState({});
  const [pricingLoading, setPricingLoading] = useState(false);
  const [priceCalculated, setPriceCalculated] = useState(true);
  const [initialValues, setInitialValues] = useState({});
  const [primaryGuestId, setPrimaryGuestId] = useState(null);

  const { isDarkMode } = useThemeContext();
  const { noteValidation } = formValidations;
  const {
    guests,
    children,
    reservationTypes,
    roomPackages,
    amenities,
    paymentMethods,
  } = additionalData;

  const mappedGuests = mapToSelectOptions(guests);
  const mappedChildren = mapToSelectOptions(children);
  const mappedRoomPackages = mapToSelectOptions(roomPackages);

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
      };

      setInitialValues(formValues);
      form.setFieldsValue(formValues);
      setPrimaryGuestId(formValues.primaryGuestId);
      setPricingInformation({
        basePrice: billing.basePrice || 0,
        totalTaxes: billing.totalTax || 0,
        discount: billing.discount || 0,
        totalPrice: billing.totalPrice || 0,
      });

      // Load available rooms based on current reservation
      loadAvailableRooms(selectedObject);
      triggerFormFieldsValidation(form);
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
      toast.error("Error loading available rooms:", error);
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

    setPriceCalculated(false);
  };

  // Refresh pricing
  const refreshPricing = async () => {
    const roomId = form.getFieldValue("roomId");
    const dateRange = form.getFieldValue("reservationDateRange");
    const checkInDate = dateRange[0];
    const checkOutDate = dateRange[1];
    const selectedPackage = form.getFieldValue("roomPackageId");

    const resp = await calculateRoomReservationPrice(
      roomId,
      checkInDate,
      checkOutDate,
      selectedAmenities,
      selectedPackage,
      setPricingLoading,
      setPricingInformation
    );

    form.setFieldsValue({
      basePrice: Math.ceil(resp.basePrice),
      totalTax: Math.ceil(resp.totalTaxes),
      discount: Math.ceil(resp.discount),
      totalPrice: Math.ceil(resp.totalPrice),
    });
    setPriceCalculated(true);
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
          ? values.actualCheckInDate.format("YYYY-MM-DDTHH:mm:ss")
          : null,
        checkOutDate: values.actualCheckOutDate
          ? values.actualCheckOutDate.format("YYYY-MM-DDTHH:mm:ss")
          : null,
        amenities: selectedAmenities.map((amenity) => ({
          amenityId: amenity.id,
          quantity: amenity.quantity,
        })),
        billingPayloadDTO: [
          {
            id: selectedObject.billing?.[0]?.id,
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
        roomReservationSourceId: selectedObject.roomReservationSourceId,
        roomReservationStatusId: selectedObject.roomReservationStatusId,
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
      const changedFields = getChangedFieldValues(initialValues, updateData, {
        mappedGuests,
        amenities,
        mappedRoomPackages,
        reservationTypes,
        mappedChildren,
        paymentMethods,
      });

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

  const afterClose = () => {
    setSelectedAmenities([]);
    setAvailableRooms([]);
    setPricingInformation({});
    setInitialValues({});
    setPriceCalculated(true);
  };

  return (
    <Modal
      title={
        <Space>
          <CalendarOutlined /> <span>Update Room Reservation</span>
        </Space>
      }
      open={open}
      onCancel={closeFormModal}
      width={900}
      footer={null}
      maskClosable={false}
      destroyOnClose
      afterClose={afterClose}
      styles={{
        header: { background: !isDarkMode ? "#f5f5f5" : "#1f1f1f" },
        content: { background: !isDarkMode ? "#f5f5f5" : "#1f1f1f" },
      }}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Reservation Details */}
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card variant="borderless">
              <Row gutter={16}>
                <Col span={16}>
                  <Form.Item
                    label={
                      <Space>
                        Reservation Date Range
                        <Tooltip title="Select check-in and check-out dates">
                          <InfoCircleOutlined />
                        </Tooltip>
                      </Space>
                    }
                    name="reservationDateRange"
                    rules={[
                      {
                        required: true,
                        message: "Please select reservation dates",
                      },
                    ]}
                    hasFeedback
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
                <Col span={8}>
                  <Row gutter={8}>
                    <Col span={8}>
                      <Form.Item
                        label="Adults"
                        name="adultNo"
                        rules={[{ required: true }]}
                        hasFeedback
                      >
                        <InputNumber
                          min={1}
                          style={{ width: "100%" }}
                          disabled
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Children"
                        name="childNo"
                        rules={[{ required: true }]}
                        hasFeedback
                      >
                        <InputNumber
                          min={0}
                          style={{ width: "100%" }}
                          disabled
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Infants"
                        name="infantNo"
                        rules={[{ required: true }]}
                        hasFeedback
                      >
                        <InputNumber
                          min={0}
                          style={{ width: "100%" }}
                          disabled
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label="Room"
                    name="roomId"
                    rules={[{ required: true }]}
                    hasFeedback
                  >
                    <Select placeholder="Select room">
                      {availableRooms.map((room) => (
                        <Option key={room.id} value={room.id}>
                          Room - {room.number || room.roomNumber}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Room Package"
                    name="roomPackageId"
                    rules={[{ required: true }]}
                    hasFeedback
                  >
                    <Select
                      placeholder="Select package"
                      onChange={() => setPriceCalculated(false)}
                      options={mappedRoomPackages}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="actualCheckInDate"
                    label="Actual Check-in"
                    hasFeedback
                  >
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD HH:mm"
                      placeholder="Select check-in date time"
                      style={{ width: "100%" }}
                      disabledDate={(current) =>
                        current && current < dayjs().startOf("day")
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Guest Information */}
          <Col span={24}>
            <Card
              title={
                <Space>
                  <UserOutlined /> Guest Information
                </Space>
              }
              variant="borderless"
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Primary Guest"
                    name="primaryGuestId"
                    rules={[
                      {
                        required: true,
                        message: "Please select primary guest",
                      },
                    ]}
                    hasFeedback
                  >
                    <Select
                      placeholder="Select primary guest"
                      onChange={(value) => {
                        setPrimaryGuestId(value);
                        // Remove from additional guests if selected
                        const currentAdditional =
                          form.getFieldValue("guestIds") || [];
                        form.setFieldsValue({
                          guestIds: currentAdditional.filter(
                            (id) => id !== value
                          ),
                          childIds: [],
                        });
                      }}
                    >
                      {guests.map((guest) => (
                        <Option key={guest.id} value={guest.id}>
                          {guest.fullName} - {guest.email}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Additional Guests"
                    name="guestIds"
                    hasFeedback
                  >
                    <Select
                      mode="multiple"
                      placeholder="Select additional guests"
                      optionFilterProp="label"
                      options={mappedGuests.filter(
                        (g) => g.value !== primaryGuestId
                      )}
                      onChange={(values) => {
                        form.setFieldsValue({ childIds: [] });
                        const adultCount = form.getFieldValue("adultNo") || 1;
                        if (values.length + 1 > adultCount) {
                          form.setFieldsValue({
                            guestIds: values.slice(0, adultCount - 1),
                          });
                        }
                      }}
                      maxTagCount={5}
                      // Disable when maximum guests are already selected
                      disabled={
                        form.getFieldValue("guestIds")?.length + 1 >=
                        (form.getFieldValue("adultNo") || 1)
                      }
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="Children" name="childIds" hasFeedback>
                    <Select
                      mode="multiple"
                      placeholder="Select children"
                      optionFilterProp="label"
                      onChange={(values) => {
                        // Check if selected children exceed the child count
                        const childCount = form.getFieldValue("childNo") || 0;
                        if (values.length > childCount) {
                          form.setFieldsValue({
                            childIds: values.slice(0, childCount),
                          });
                        }
                      }}
                      // Disable when maximum children are already selected
                      disabled={
                        form.getFieldValue("childIds")?.length >=
                        (form.getFieldValue("childNo") || 0)
                      }
                    >
                      {children
                        .filter((child) => {
                          // Get current values from form
                          const formValues = form.getFieldsValue([
                            "primaryGuestId",
                            "guestIds",
                          ]);
                          const allSelectedGuestIds = [
                            formValues.primaryGuestId,
                            ...(formValues.guestIds || []),
                          ].filter(Boolean);

                          return allSelectedGuestIds.includes(child.guestId);
                        })
                        .map((child) => (
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
                    hasFeedback
                  >
                    <Select placeholder="Select type">
                      {reservationTypes.map((type) => (
                        <Option key={type.value} value={type.value}>
                          {type.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Note"
                    name="note"
                    hasFeedback
                    rules={noteValidation}
                  >
                    <TextArea
                      rows={2}
                      placeholder="Special requests or notes"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Amenities */}
          <Col span={24}>
            <Card
              title={
                <Space>
                  <CoffeeOutlined /> Amenities{" "}
                  <Tooltip title="Select and adjust quantities for extra amenities">
                    <InfoCircleOutlined />
                  </Tooltip>
                </Space>
              }
              variant="borderless"
            >
              <Row gutter={[16, 16]}>
                {amenities.map((amenity) => {
                  const selectedAmenity = selectedAmenities.find(
                    (a) => a.id === amenity.id
                  );
                  const quantity = selectedAmenity
                    ? selectedAmenity.quantity
                    : 0;

                  return (
                    <Col span={6} key={amenity.id}>
                      <Card
                        size="small"
                        style={{
                          height: "100%",
                        }}
                      >
                        <div style={{ fontWeight: "bold", marginBottom: 8 }}>
                          {amenity.icon && (
                            <span style={{ marginRight: 6 }}>
                              {amenity.icon}
                            </span>
                          )}
                          {amenity.name}
                        </div>
                        <div style={{ color: "#777", marginBottom: 8 }}>
                          {formatCurrency(amenity.price)} each
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
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
          </Col>

          {/* Payment Information */}
          <Col span={24}>
            <Card
              title={
                <Space>
                  <DollarOutlined /> Payment Information
                </Space>
              }
              variant="borderless"
              extra={
                <Button
                  variant="filled"
                  color="geekblue"
                  onClick={() =>
                    form.validateFields(["roomPackageId"]).then(() => {
                      refreshPricing();
                      setPriceCalculated(true);
                    })
                  }
                  icon={<DollarOutlined />}
                  loading={pricingLoading}
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
                    styles={{ label: { fontWeight: "bold" } }}
                  >
                    <Descriptions.Item label="Base Price">
                      <Form.Item name="basePrice" noStyle>
                        <InputNumber
                          disabled
                          style={{ width: "100%" }}
                          placeholder="0.00"
                          precision={2}
                          prefix="Rs."
                        />
                      </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label="Discount">
                      <Form.Item name="discount" noStyle>
                        <InputNumber
                          disabled
                          style={{ width: "100%" }}
                          placeholder="0.00"
                          precision={2}
                          prefix="Rs."
                        />
                      </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label="Tax">
                      <Form.Item name="totalTax" noStyle>
                        <InputNumber
                          disabled
                          style={{ width: "100%" }}
                          placeholder="0.00"
                          precision={2}
                          prefix="Rs."
                        />
                      </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label="Total">
                      <Form.Item name="totalPrice" noStyle>
                        <InputNumber
                          disabled
                          style={{
                            width: "100%",
                            color: "#389e0d",
                            fontWeight: "bold",
                            background: "#f6ffed",
                          }}
                          placeholder="0.00"
                          precision={2}
                          prefix="Rs."
                        />
                      </Form.Item>
                    </Descriptions.Item>
                  </Descriptions>
                  <div style={{ marginTop: 16 }}>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          label={
                            <span>
                              Payment Method{" "}
                              <Tooltip title="Select how the guest paid">
                                <InfoCircleOutlined />
                              </Tooltip>
                            </span>
                          }
                          name="paymentMethodId"
                          rules={[{ required: true }]}
                          hasFeedback
                        >
                          <Select placeholder="Select payment method">
                            {paymentMethods.map((method) => (
                              <Option key={method.value} value={method.value}>
                                {method.label}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label={
                            <span>
                              Amount Paid{" "}
                              <Tooltip title="Enter the amount received">
                                <InfoCircleOutlined />
                              </Tooltip>
                            </span>
                          }
                          name="paidAmount"
                          rules={[{ required: true }]}
                          hasFeedback
                        >
                          <InputNumber
                            placeholder="0.00"
                            min={0}
                            precision={2}
                            style={{ width: "100%" }}
                            prefix="Rs."
                            keyboard
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col span={24}>
            <Flex justify="end" style={{ marginBottom: 8 }}>
              {!priceCalculated && (
                <AntdAlert
                  message="Please recalculate the price after changing reservation details before updating."
                  type="warning"
                  showIcon
                  style={{ marginBottom: 8 }}
                />
              )}
            </Flex>
            <Flex justify="end">
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={!priceCalculated}
                >
                  Update Reservation
                </Button>
              </Space>
            </Flex>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default RoomReservationUpdateForm;
