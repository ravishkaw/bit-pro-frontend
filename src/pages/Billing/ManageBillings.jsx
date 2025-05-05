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
    <GenericPage
      module={module}
      rowKey={rowKey}
      hookData={hookData}
      columnItems={BillingColumnItems}
      CustomForm={RoomPricingRuleForm}
    />
  );
};

export default ManageBillings;
