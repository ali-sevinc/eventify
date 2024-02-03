import { useEffect, useRef } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import L, { LeafletMouseEvent } from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { panMarker, setInitialCoords, showForm } from "../events/eventSlice";
import { formatDate } from "../../utils/fncs";

export default function Map() {
  const { events, mapCenter } = useSelector((state: RootState) => state.event);
  const mapRef = useRef<L.Map>(null);

  const dispatch = useDispatch();

  useEffect(
    function () {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // console.log(latitude, longitude);
          dispatch(panMarker([latitude, longitude]));
        },
        () => {
          alert("Position could not fetched.");
        }
      );
    },
    [dispatch]
  );

  useEffect(
    function () {
      mapRef.current?.setView(mapCenter, 13);
    },
    [mapCenter]
  );

  function handleMarker(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    dispatch(showForm());
    dispatch(setInitialCoords([lat, lng]));
  }

  return (
    <MapContainer ref={mapRef} zoom={13} className="h-full w-full ">
      <MapEvents onMapClick={handleMarker} />
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {events.map((event) => {
        const title = event.title;

        return (
          <Marker position={event.coords} key={event.id}>
            <Popup
              autoClose={false}
              closeOnClick={false}
              maxWidth={200}
              maxHeight={100}
            >
              <h3 className="capitalize">{title}</h3>
              <div className="flex items-center gap-2">
                <p>{formatDate(event.date)}</p>
                <span>/</span>
                <time className="p-0">{event.time}</time>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

function MapEvents({
  onMapClick,
}: {
  onMapClick: (e: LeafletMouseEvent) => void;
}) {
  useMapEvents({
    click: onMapClick,
  });
  return null;
}
