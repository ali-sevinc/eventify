import { useDispatch, useSelector } from "react-redux";
import Modal from "../ui/Modal";
import { AppDispatch, RootState } from "../../store";
import { clearDetails } from "./eventSlice";
import Button from "../ui/Button";
import { formatDate } from "../../utils/fncs";

export default function EventDetails() {
  const { eventDetail, address } = useSelector(
    (state: RootState) => state.event
  );
  const dispatch = useDispatch() as AppDispatch;

  function handleClose() {
    dispatch(clearDetails());
  }

  return (
    <Modal onClose={handleClose} open={address !== null}>
      <div className="flex flex-col gap-4 text-gray-50">
        <h2 className="text-2xl">{eventDetail?.title}</h2>
        <div>
          <p>📅{eventDetail?.date && formatDate(eventDetail?.date)}</p>
          <p>🕐{eventDetail?.time}</p>
        </div>
        <p>
          <b>Details: </b>
          <span>{eventDetail?.description}</span>
        </p>
        <div>
          {address !== null && (
            <address>
              <b>Address:</b> {address}
            </address>
          )}
        </div>
        <div>
          <Button onClick={handleClose} type="button" model="btn">
            Okay
          </Button>
        </div>
      </div>
    </Modal>
  );
}
