export interface Event {
  id: string;
  title: string;
  date: string;
  city: string;
  venue: string;
  description: string;
  image: string;
  ticket_url: string;
  category: string;
}

export type EventsFilters = {
  city: string | null;
  search: string;
  dateFrom: string | null;
  dateTo: string | null;
};
