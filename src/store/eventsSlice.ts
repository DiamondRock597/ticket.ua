import { createSlice } from '@reduxjs/toolkit';
import type { Event, EventsFilters } from '../types/event';
import eventsData from '../data/events.json';

const events = eventsData as Event[];

const initialState = {
  events,
  filters: {
    city: null as string | null,
    search: '',
    dateFrom: null as string | null,
    dateTo: null as string | null,
  } as EventsFilters,
};

function filterEvents(list: Event[], filters: EventsFilters): Event[] {
  return list.filter((event) => {
    if (filters.city && event.city !== filters.city) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const match =
        event.title.toLowerCase().includes(q) ||
        event.description.toLowerCase().includes(q) ||
        event.venue.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (filters.dateFrom && event.date < filters.dateFrom) return false;
    if (filters.dateTo && event.date > filters.dateTo) return false;
    return true;
  });
}

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setFilters(state, action: { payload: Partial<EventsFilters> }) {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters(state) {
      state.filters = initialState.filters;
    },
    setEvents(state, action: { payload: Event[] }) {
      state.events = action.payload;
    },
  },
});

export const { setFilters, resetFilters, setEvents } = eventsSlice.actions;

export const selectEvents = (state: { events: typeof initialState }) =>
  state.events.events;

export const selectFilters = (state: { events: typeof initialState }) =>
  state.events.filters;

export const selectFilteredEvents = (state: { events: typeof initialState }) =>
  filterEvents(state.events.events, state.events.filters);

export const selectCities = (state: { events: typeof initialState }) => {
  const set = new Set(state.events.events.map((e) => e.city));
  return Array.from(set).sort();
};

export const selectEventById =
  (id: string) => (state: { events: typeof initialState }) =>
    state.events.events.find((e) => e.id === id) ?? null;

/** Upcoming events sorted by date, for "top" / feed section (e.g. first 5). */
export const selectTopEvents = (state: { events: typeof initialState }) => {
  const list = filterEvents(state.events.events, state.events.filters);
  return [...list]
    .sort((a, b) => (a.date < b.date ? -1 : 1))
    .slice(0, 5);
};

export default eventsSlice.reducer;
