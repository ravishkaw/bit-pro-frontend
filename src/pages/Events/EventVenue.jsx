import useEventVenues from "../../hooks/events/useEventVenues";

import GenericPage from "../GenericPage";
import { EventVenueColumnItems } from "../../components/Table/EventVenueColumnItems";
import EventVenueForm from "../../components/Forms/EventVenueForm";

const EventVenue = () => {
  const module = "Event Venue"; 
  const rowKey = "id"; 

  // Destructure functions and states
  const hookData = useEventVenues();

  return (
    <GenericPage
      module={module}
      rowKey={rowKey}
      hookData={hookData}
      columnItems={EventVenueColumnItems}
      CustomForm={EventVenueForm}
    />
  );
};
export default EventVenue;
