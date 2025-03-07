import { Result, Button } from "antd";
import { useNavigate } from "react-router";

// 500 Server error
const ServerError = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="500"
      title="500"
      subTitle="Sever Error! Try again later."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Back Home
        </Button>
      }
    />
  );
};

export default ServerError;
