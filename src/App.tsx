import SideBar from "./features/sidebar/SideBar";
import Map from "./features/map/Map";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";

import EventForm from "./features/events/EventForm";
import { EventType, initialEvents } from "./features/events/eventSlice";
import EventDetails from "./features/events/EventDetails";

export default function App() {
  const dispatch = useDispatch() as AppDispatch;
  useEffect(
    function () {
      {
        const events: EventType[] = JSON.parse(
          localStorage.getItem("events") || JSON.stringify([])
        );
        dispatch(initialEvents(events));
      }
    },
    [dispatch]
  );

  return (
    <div className="grid grid-cols-[28rem,1fr] p-4 h-screen">
      <EventDetails />
      <EventForm />
      <SideBar />
      <Map />
    </div>
  );
}
