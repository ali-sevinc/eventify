import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { EventType, hideForm, newEvent, writeLocalstorage } from "./eventSlice";

import Modal from "../ui/Modal";
import InputGroup from "../ui/InputGroup";
import Button from "../ui/Button";
import { FormEvent } from "react";

export default function EventForm() {
  const { showForm, initialCoords } = useSelector(
    (state: RootState) => state.event
  );
  const dispatch = useDispatch() as AppDispatch;
  function handleClose() {
    dispatch(hideForm());
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const title = formData.get("title")?.toString();
    const date = formData.get("date")?.toString();
    const time = formData.get("time")?.toString();
    const description = formData.get("description")?.toString();

    if (
      !title ||
      title.trim().length < 3 ||
      !date ||
      !time ||
      !description ||
      description.trim().length < 3
    ) {
      return;
    }
    const id = Date.now().toString().slice(-10) + Math.random();
    const data: EventType = {
      title,
      date,
      time,
      description,
      id,
      coords: initialCoords,
    };

    dispatch(newEvent(data));
    dispatch(writeLocalstorage());
    form.reset();
    handleClose();
  }

  return (
    <Modal onClose={handleClose} open={showForm}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-gray-50 font-semibold text-xl mb-4">New Event</h2>
        <InputGroup
          label="Title"
          name="title"
          placeHolder="Title...."
          type="string"
        />
        <InputGroup
          label="Date"
          name="date"
          placeHolder="Date...."
          type="date"
        />
        <InputGroup
          label="Time"
          name="time"
          placeHolder="Time..."
          type="time"
        />
        <InputGroup
          label="Description"
          name="description"
          placeHolder="Description..."
          area
        />
        <div className="flex justify-end gap-8 items-center">
          <Button type="button" onClick={handleClose} model="txt">
            Cancel
          </Button>
          <Button type="submit" model="btn">
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
}
