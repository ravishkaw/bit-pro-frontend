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

const RoomPaymentForm = () => {
  return (
    <>
      {/* Summary */}
      <Card style={{ marginBottom: 16 }}>
        <Title level={5}>Summary</Title>
        <Paragraph>Total additional charges: 235</Paragraph>
      </Card>
    </>
  );
};
export default RoomPaymentForm;
