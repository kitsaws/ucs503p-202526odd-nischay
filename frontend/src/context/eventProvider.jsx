import { useState, useEffect } from "react";
import EventContext from "./eventContext";
import api from "../services/api"; // your axios instance

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const { data } = await api.get("/events/");
        setEvents(data);
      } catch (err) {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <EventContext.Provider value={{ events, setEvents, loading }}>
      {children}
    </EventContext.Provider>
  );
}
