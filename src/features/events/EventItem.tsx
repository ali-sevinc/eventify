import { useDispatch } from "react-redux";
import {
  deleteEvent,
  details,
  fetchDetails,
  panMarker,
  writeLocalstorage,
} from "./eventSlice";
import { formatDate } from "../../utils/fncs";
import { AppDispatch } from "../../store";

type PropsType = {
  title: string;
  date: string;
  time: string;
  id: string;
  coords: [number, number];
  description: string;
};
export default function EventItem({
  date,
  time,
  title,
  id,
  coords,
  description,
}: PropsType) {
  const dispatch = useDispatch() as AppDispatch;

  function handleCenter() {
    dispatch(panMarker(coords));
  }

  function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    dispatch(deleteEvent({ id }));
    dispatch(writeLocalstorage());
  }

  async function handleDetails() {
    await dispatch(
      fetchDetails({
        lat: coords[0],
        lon: coords[1],
      })
    );
    dispatch(details({ coords, date, description, id, time, title }));
  }

  return (
    <li
      onClick={handleCenter}
      className="bg-gray-600 cursor-pointer text-gray-50 px-4 py-2 relative"
    >
      <h2 className="text-2xl font-semibold pb-2">{title}</h2>
      <div className="font-semibold text-gray-200">
        <p>
          <span>📅 </span>
          <span className="italic">{formatDate(date)}</span>
        </p>
        <p>
          <span>🕛 </span>
          <time className="italic">{time}</time>
        </p>
      </div>
      <div className="top-1 right-1 absolute text-sm">
        <button
          onClick={handleDetails}
          className="font-bold hover:scale-110 duration-200"
        >
          📑
        </button>
        <button
          onClick={handleDelete}
          className="font-bold hover:scale-110 duration-200"
        >
          ✖
        </button>
      </div>
    </li>
  );
}
