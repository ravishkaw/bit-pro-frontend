import { Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

// Tooltip to show with label
// label - Form input label , title - Tooltip message
const FormInputTooltip = ({ label, title }) => {
  return (
    <span>
      {label}&nbsp;&nbsp;
      <Tooltip title={title} placement="topLeft">
        <QuestionCircleOutlined style={{ color: "red" }} />
      </Tooltip>
    </span>
  );
};

export default FormInputTooltip;
