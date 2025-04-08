import { Layout } from "antd";

// Main content area
// renders children here
const AppContent = ({ children }) => {
  return <Layout.Content style={contentStyle}>{children}</Layout.Content>;
};
export default AppContent;

const contentStyle = {
  padding: "20px",
  width: "100%",
  maxWidth: "1440px",
  margin: "0 auto",
};
