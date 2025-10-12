import { createContext, useContext } from "react";

const UserContext = createContext(null);

// Custom hook to use the context
export function useUser() {
  return useContext(UserContext);
}

export default UserContext;