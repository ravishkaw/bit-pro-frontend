import { useState, useEffect } from "react";
import { Button, Form, Input, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

import { useAuth } from "../../contexts/AuthContext";

const { Link } = Typography;

// Login form
const LoginForm = () => {
  const navigate = useNavigate();
  const { user, handleLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // login handler
  const onFinish = async (loginFormData) => {
    setLoading(true);
    try {
      await handleLogin(loginFormData);
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  // Redirect when user state changes
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <Form
      form={form}
      name="normal_login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      layout="vertical"
      requiredMark="optional"
      style={{ width: "100%" }}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Link href="#" style={{ float: "right" }}>
          Forgot password?
        </Link>
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit" loading={loading}>
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
