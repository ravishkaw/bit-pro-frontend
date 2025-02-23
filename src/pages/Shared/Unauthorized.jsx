import { Button, Result } from "antd";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

// Unauthorized Access Page
const Unauthorized = () => {
  const { user } = useAuth(); // Get the current user from AuthContext
  const navigate = useNavigate();

  return (
    <Result
      status="403"
      // title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button
          type="primary"
          onClick={() => navigate(user ? "/dashboard" : "/")} // Redirect to dashboard if logged in, otherwise to login page
        >
          Back Home
        </Button>
      }
    />
  );
};

export default Unauthorized;
