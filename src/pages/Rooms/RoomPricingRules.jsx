import usePricingRules from "../../hooks/usePricingRules";

import GenericPage from "../GenericPage";
import { PricingRulesColumnItems } from "../../components/Table/RoomPricingRuleColumnItems";
import RoomPricingRuleForm from "../../components/Forms/RoomPricingRuleForm";

const ManageRoomPricingRules = () => {
  const module = "Room Pricing Rule"; // Define the module type for pricing rule
  const rowKey = "id"; // define row key for table

  return (
    <GenericPage
      module={module}
      useCustomHook={usePricingRules}
      rowKey={rowKey}
      columnItems={PricingRulesColumnItems}
      CustomForm={RoomPricingRuleForm}
    />
  );
};

export default ManageRoomPricingRules;
