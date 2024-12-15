import { Layout } from "antd";

const AppContent = ({ children }) => {
  return <Layout.Content style={contentStyle}>{children}</Layout.Content>;
};
export default AppContent;

const contentStyle = {
  padding: "20px",
};
