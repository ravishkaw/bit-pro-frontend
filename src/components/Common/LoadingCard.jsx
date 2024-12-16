import { Card, Skeleton } from "antd";

const LoadingCard = () => {
  return (
    <Card style={{ marginBottom: "16px" }}>
      <Skeleton active title={{ width: "60%" }} paragraph={{ rows: 4 }} />
    </Card>
  );
};
export default LoadingCard;
