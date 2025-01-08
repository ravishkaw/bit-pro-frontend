import { Card, Skeleton } from "antd";

const SkeletonCards = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} style={{ marginBottom: 10 }}>
          <Skeleton active />
        </Card>
      ))}
    </>
  );
};
export default SkeletonCards;
