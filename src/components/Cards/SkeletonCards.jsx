import { Card, Skeleton } from "antd";

// SkeletonCards component to display loading placeholders for cards
const SkeletonCards = () => {
  return (
    <>
      {/* Create 3 skeleton cards to simulate loading state */}
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} style={{ marginBottom: 10 }}>
          <Skeleton active />
        </Card>
      ))}
    </>
  );
};

export default SkeletonCards;
