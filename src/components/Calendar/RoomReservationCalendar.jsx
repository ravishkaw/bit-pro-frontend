import { Badge, Calendar, Modal } from "antd";
import { useThemeContext } from "../../contexts/ThemeContext";

const RoomReservationCalendar = ({ calendarOpen, closeCalendar }) => {
  const { isDarkMode } = useThemeContext();

  // reservations: Array of { date: 'YYYY-MM-DD', title: 'Reservation Name' }
  const reservations = [
    { date: "2025-04-24", title: "Room 101 - John Doe" },
    { date: "2025-04-25", title: "Room 102 - Jane Smith" },
    // ...more reservations
  ];

  function dateCellRender(value) {
    const dateStr = value.format("YYYY-MM-DD");
    const dayReservations = reservations.filter((r) => r.date === dateStr);
    return (
      <ul>
        {dayReservations.map((item, idx) => (
          <li key={idx}>
            <Badge status="success" text={item.title} />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <Modal
      title="Room Reservation Calendar"
      open={calendarOpen}
      footer={null}
      width={1000}
      onCancel={closeCalendar}
      destroyOnClose
    >
      <div
        className={`sider-content-scroll${isDarkMode ? " dark" : ""}`}
        style={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        <Calendar cellRender={dateCellRender} />
      </div>
    </Modal>
  );
};
export default RoomReservationCalendar;
