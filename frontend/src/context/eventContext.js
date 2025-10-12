import { createContext, useContext } from "react";

const EventContext = createContext(null);

// Custom hook to use the context
export function useEvent() {
  return useContext(EventContext);
}

export default EventContext;