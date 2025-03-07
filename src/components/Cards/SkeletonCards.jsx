import { Card, Skeleton } from "antd";

// SkeletonCards to display loading placeholders for cards
const SkeletonCards = () => {
  return (
    <>
      {/* 3 skeleton cards*/}
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} style={{ marginBottom: 10 }}>
          <Skeleton active />
        </Card>
      ))}
    </>
  );
};

export default SkeletonCards;
