import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type EventType = {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  coords: [number, number];
};

export interface EventState {
  events: EventType[];
  showForm: boolean;
  initialCoords: [number, number];
  mapCenter: [number, number];
  eventDetail: EventType;
  address: string | null;
}
const defaultCoords: [number, number] = [51.505, -0.09];
const initialDetail: EventType = {
  id: "",
  coords: defaultCoords,
  date: "",
  description: "",
  time: "",
  title: "",
};

const initialState: EventState = {
  events: [],
  showForm: false,
  initialCoords: defaultCoords,
  mapCenter: defaultCoords,
  eventDetail: initialDetail,
  address: null,
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    showForm: (state) => {
      state.showForm = true;
    },
    hideForm: (state) => {
      state.showForm = false;
    },
    setInitialCoords(state, action: PayloadAction<[number, number]>) {
      state.initialCoords = action.payload;
    },
    newEvent: (state, action: PayloadAction<EventType>) => {
      state.events = [...state.events, action.payload];
    },
    deleteEvent: (state, action: PayloadAction<{ id: string }>) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload.id
      );
    },
    panMarker: (state, action: PayloadAction<[number, number]>) => {
      state.mapCenter = action.payload;
    },
    initialEvents: (state, action: PayloadAction<EventType[]>) => {
      state.events = action.payload;
    },
    details: (state, action: PayloadAction<EventType>) => {
      state.eventDetail = action.payload;
    },
    clearDetails: (state) => {
      state.eventDetail = initialDetail;
      state.address = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDetails.fulfilled, (state, action) => {
      state.address = action.payload;
    });
  },
});

//add events to localstorage
export const writeLocalstorage = createAsyncThunk(
  "events/write",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    localStorage.setItem("events", JSON.stringify(state.event.events));
  }
);

//clear localstorage
export const clearEvents = createAsyncThunk(
  "events/clear",
  async (_, { dispatch }) => {
    localStorage.setItem("events", JSON.stringify([]));
    dispatch(initialEvents([]));
  }
);

//fetching not detailed address by selecting coords.
export const fetchDetails = createAsyncThunk(
  "event/detail",
  async (payload: { lat: number; lon: number }) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${payload.lat}&lon=${payload.lon}`
    );
    const data = await res.json();
    const address = data?.display_name || "Unknown address.";

    return address;
  }
);

export const {
  showForm,
  hideForm,
  setInitialCoords,
  panMarker,
  initialEvents,
  newEvent,
  deleteEvent,
  details,
  clearDetails,
} = eventSlice.actions;

export default eventSlice.reducer;
