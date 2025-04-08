import { Card, Row, Col, Typography, Flex, Button } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

import backgroundImage from "../../assets/hotelbg.jpg";
import { useThemeContext } from "../../contexts/ThemeContext";

import LoginForm from "../Forms/LoginForm";
import { getGreeting } from "../../utils/utils";

const { Title, Text } = Typography;

// Login page component
const Login = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();

  // theme toggle button style
  const themeToggleStyle = {
    fontSize: "1.25rem",
    color: isDarkMode && "white",
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 3,
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        padding: 20,
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
        }}
      />
      {/* Opacity overlay*/}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#6b6c7287",
          zIndex: -1,
        }}
      />
      <Card
        variant="borderless"
        style={{
          width: "90%",
          maxWidth: 1000,
          minHeight: "80vh",
          borderRadius: 8,
        }}
        styles={{ body: { padding: 0 } }}
      >
        <Button type="text" onClick={toggleTheme} style={themeToggleStyle}>
          {isDarkMode ? <SunOutlined /> : <MoonOutlined />}
        </Button>
        <Row>
          <Col xs={0} sm={12}>
            <img
              src={backgroundImage}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
          </Col>

          {/* Login Form */}
          <Col
            xs={24}
            sm={12}
            style={{
              padding: 16,
              borderRadius: 8,
              minHeight: "80vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Flex
              justify="center"
              align="center"
              vertical
              style={{ textAlign: "center" }}
            >
              <Title level={3} style={{ color: "#666cff" }}>
                {getGreeting()}
              </Title>
              <Title level={2} style={{ margin: 0, color: "#666cff" }}>
                Welcome to Villa Waterlilly
              </Title>
              <Text style={{ margin: 16 }}>Sign in to your account</Text>
              <LoginForm />
            </Flex>
          </Col>
        </Row>
      </Card>
    </Row>
  );
};

export default Login;
