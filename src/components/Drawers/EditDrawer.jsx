import { Button, Drawer, Space } from "antd";

const EditDrawer = ({ isDrawerOpen, setIsDrawerOpen }) => {
  return (
    <Drawer
      title="View Employee Details"
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
      width={640}
      placement="right"
      //   closable={false}
      extra={
        <Space>
          {/* <Button onClick={() => setIsDrawerOpen(false)}>Cancel</Button> */}
          <Button type="primary">Edit</Button>
        </Space>
      }
    >
      <p>Three Forms / This is for view then edit button press and edit</p>
    </Drawer>
  );
};
export default EditDrawer;
