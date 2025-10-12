import { createContext, useContext } from "react";

const TeamContext = createContext(null);

// Custom hook to use the context
export function useTeam() {
  return useContext(TeamContext);
}

export default TeamContext;