import { useState, useEffect } from "react";
import { Layout, Button, Row, Col, Typography, Space } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";

import { useHeaderTitleContext } from "../../../contexts/HeaderTitleContext";
import NotificationPopover from "../../Popover/NotificationPopover";
import { useThemeContext } from "../../../contexts/ThemeContext";
import AvatarPopover from "../../Popover/AvatarPopover";

// Header component of the app
const AppHeader = ({ isMobile, collapsed, setCollapsed, setDrawerOpen }) => {
  const { headerTitle } = useHeaderTitleContext();
  const { isDarkMode, toggleTheme } = useThemeContext();
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () =>
    isMobile ? setDrawerOpen(true) : setCollapsed(!collapsed);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled down
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        // Reset when scrolled back to the top
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // change colors in dark mode and scrolling
  const headerStyle = {
    position: "sticky",
    top: 0,
    zIndex: 100,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    margin: isScrolled ? "0 20px" : "0",
    transition: "margin 0.3s ease",
    backgroundColor: isScrolled && (isDarkMode ? "#212235f9" : "#ffffffe6"),
    boxShadow:
      isScrolled &&
      (isDarkMode
        ? "0 .25rem .5rem -0.25rem #1011216b"
        : "0 .25rem .5rem -0.25rem #262b436b"),
  };

  // button style
  const buttonStyle = {
    fontSize: "1.25rem",
    lineHeight: "1.25rem",
    verticalAlign: "middle",
    borderRadius: "50%",
    color: isDarkMode && "white",
    padding: 5,
  };

  return (
    <Layout.Header style={headerStyle}>
      <Row justify="space-between" align="middle" wrap={false}>
        <Col>
          <Button type="text" onClick={toggleMenu} style={buttonStyle}>
            {collapsed || isMobile ? (
              <MenuUnfoldOutlined />
            ) : (
              <MenuFoldOutlined />
            )}
          </Button>
        </Col>
        <Col>
          <Typography.Title level={isMobile ? 4 : 3} style={{ margin: 0 }}>
            {headerTitle}
          </Typography.Title>
        </Col>
        <Col>
          <Space size="large" align="center" wrap={false}>
            <Button type="text" onClick={toggleTheme} style={buttonStyle}>
              {isDarkMode ? <SunOutlined /> : <MoonOutlined />}
            </Button>
            <NotificationPopover />
            <AvatarPopover />
          </Space>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default AppHeader;
