import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { clearEvents } from "../events/eventSlice";
import EventList from "../events/EventList";
import Button from "../ui/Button";
import { useState } from "react";
import Confirm from "../ui/Confirm";

export default function SideBar() {
  const { events } = useSelector((state: RootState) => state.event);
  const dispatch = useDispatch() as AppDispatch;
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  function handleDelete() {
    setIsDeleting(true);
  }

  function handleProceed() {
    dispatch(clearEvents());
    setIsDeleting(false);
  }

  return (
    <>
      <Confirm
        open={isDeleting}
        onDelete={handleProceed}
        onClose={() => setIsDeleting(false)}
        title="Are you sure?"
        message="Do you really want to delete all events? This action connot be undone."
      />
      <aside className="bg-gray-800 h-full relative overflow-y-scroll ">
        {events.length > 0 && (
          <div className="absolute top-4 right-4">
            <Button model="txt" type="button" onClick={handleDelete}>
              Clear All
            </Button>
          </div>
        )}
        <header className="text-center mt-8 mb-4">
          <h1 className="text-4xl font-bold text-gray-50">Eventify</h1>
        </header>
        <div>
          <EventList />
        </div>
      </aside>
    </>
  );
}
