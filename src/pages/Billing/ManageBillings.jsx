import { Watermark } from "antd";
import RoomPricingRuleForm from "../../components/Forms/RoomPricingRuleForm";
import { BillingColumnItems } from "../../components/Table/BillingColumnItems";
import useBillings from "../../hooks/billing/useBillings";
import GenericPage from "../GenericPage";

const ManageBillings = () => {
  const module = "Billing"; // Define the module for guest
  const rowKey = "id"; // define row key for table

  // Destructure functions and states
  const hookData = useBillings();

  return (
    <Watermark content="This is not finished yet">
      <GenericPage
        module={module}
        rowKey={rowKey}
        hookData={hookData}
        columnItems={BillingColumnItems}
        CustomForm={RoomPricingRuleForm}
      />
    </Watermark>
  );
};

export default ManageBillings;
