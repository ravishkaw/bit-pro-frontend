import { QuestionCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

const FormInputTooltip = ({ label, title }) => {
  return (
    <span>
      {label}&nbsp;&nbsp;
      <Tooltip title={title} color={"#4f72ff"}>
        <QuestionCircleOutlined style={{ color: "red" }} />
      </Tooltip>
    </span>
  );
};
export default FormInputTooltip;
