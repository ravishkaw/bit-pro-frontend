import { Card, Row, Col, Typography, Flex, ConfigProvider } from "antd";

import LoginForm from "../Forms/LoginForm";

import backgroundImage from "../../assets/hotelbg.jpg";

const { Title, Text } = Typography;

// Login page component
const Login = () => {
  return (
    <ConfigProvider
      theme={{
        token: { paddingLG: 0 }, // remove the padding of card
      }}
    >
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
        {/* Beige Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "hsla(32, 25%, 90%, 0.6)",
            zIndex: -1,
          }}
        />
        <Card
          bordered={false}
          style={{
            width: "90%",
            maxWidth: 1000,
            minHeight: "80vh",
            borderRadius: 8,
            boxShadow: "0 6px 12px 5px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Row>
            {/* Left Column: Welcome Text */}
            <Col xs={0} sm={12}>
              {/* <Flex justify="center" align="center" style={{ height: "100%" }}>
                <Title
                  style={{
                    color: "white",
                    fontSize: "4rem",
                    textShadow: "2px 2px #ffffff",
                  }}
                >
                  Welcome to <br />
                  Villa Water Lilly
                </Title>
              </Flex> */}
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

            {/* Right Column: Login Form */}
            <Col
              xs={24}
              sm={12}
              style={{
                background: "#fff",
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
                <Title level={1} style={{ margin: 0, color: "#b88a5c" }}>
                  Hello!
                </Title>
                <Title level={2} style={{ margin: 0, color: "#b88a5c" }}>
                  Welcome to Villa Waterlilly
                </Title>
                <Text style={{ margin: 16 }}>Sign in to your account</Text>
                <LoginForm />
              </Flex>
            </Col>
          </Row>
        </Card>
      </Row>
    </ConfigProvider>
  );
};

export default Login;
