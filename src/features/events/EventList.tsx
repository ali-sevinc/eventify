import { useSelector } from "react-redux";
import EventItem from "./EventItem";
import { RootState } from "../../store";

export default function EventList() {
  const { events } = useSelector((state: RootState) => state.event);
  return (
    <ul className="flex flex-col px-4 py-8 gap-4">
      {events && events.map((event) => <EventItem key={event.id} {...event} />)}
    </ul>
  );
}
