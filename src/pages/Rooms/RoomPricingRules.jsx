import usePricingRules from "../../hooks/usePricingRules";

import GenericPage from "../GenericPage";
import { PricingRulesColumnItems } from "../../components/Table/RoomPricingRuleColumnItems";
import RoomPricingRuleForm from "../../components/Forms/RoomPricingRuleForm";

// Room pricing rules page
const ManageRoomPricingRules = () => {
  const module = "Room Pricing Rule"; // Define the module type for pricing rule
  const rowKey = "id"; // define row key for table

  // Destructure functions and states
  const hookData = usePricingRules();

  return (
    <GenericPage
      module={module}
      hookData={hookData}
      rowKey={rowKey}
      columnItems={PricingRulesColumnItems}
      CustomForm={RoomPricingRuleForm}
    />
  );
};

export default ManageRoomPricingRules;
