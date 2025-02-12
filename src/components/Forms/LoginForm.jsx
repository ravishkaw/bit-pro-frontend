import { useState, useEffect } from "react";
import { Button, Form, Input, message, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

import { useAuth } from "../../contexts/AuthContext";

const { Link } = Typography;

// Login form
const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Simulate async login API (replace with real DB/API call)
  const fakeLoginApi = (role) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ user: { name: "John Doe", role } });
      }, 1000); // Simulate network delay
    });

  // Unified login handler
  const handleLogin = async (role) => {
    setLoading(true);
    try {
      const response = await fakeLoginApi(role);
      setUser(response.user);
      message.success("Login successful!");
    } catch (error) {
      console.error("Login failed", error);
      message.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Redirect when user state changes
  useEffect(() => {
    if (user) {
      const routes = {
        admin: "/admin",
        manager: "/manager",
        user: "/",
      };
      navigate(routes[user.role] || "/");
    }
  }, [user, navigate]);

  return (
    <Form
      form={form}
      name="normal_login"
      initialValues={{ remember: true }}
      onFinish={() => handleLogin("")}
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

      {/* Fake Login Buttons */}
      <Form.Item label="Fake Logins">
        <Button
          block
          onClick={() => handleLogin("admin")}
          disabled={loading}
          loading={loading}
          style={{ marginBottom: 8 }}
        >
          Login as Admin
        </Button>
        <Button
          block
          onClick={() => handleLogin("manager")}
          disabled={loading}
          loading={loading}
        >
          Login as Manager
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
