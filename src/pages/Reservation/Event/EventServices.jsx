import useEventReservationServices from "../../../hooks/reservation/useEventReservationServices";

import EventReservationServicesForm from "../../../components/Forms/EventReservationServicesForm";
import { EventReservationServicesColumnItems } from "../../../components/Table/EventReservationServicesColumnItems";

import GenericPage from "../../GenericPage";

const EventServices = () => {
  const module = "Event Reservation Service"; // Define the module for Event Reservation Service
  const rowKey = "id"; // define row key for table

  // Destructure functions and states
  const hookData = useEventReservationServices();

  return (
    <GenericPage
      module={module}
      rowKey={rowKey}
      hookData={hookData}
      columnItems={EventReservationServicesColumnItems}
      CustomForm={EventReservationServicesForm}
    />
  );
};
export default EventServices;
