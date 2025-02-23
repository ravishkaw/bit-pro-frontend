import { Descriptions } from "antd";

// use to render descriptions - view employee details etc.
const DescriptionsSection = ({ title, data }) => {
  return (
    <Descriptions title={title}>
      {data.map(({ key, label, value }) => (
        <Descriptions.Item key={key} label={label}>
          {value ? value : "-"}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );
};

export default DescriptionsSection;
