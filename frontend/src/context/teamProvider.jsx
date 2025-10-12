import { useState, useEffect } from "react";
import TeamContext from "./teamContext";
import api from "../services/api"; // your axios instance

export function TeamProvider({ children }) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const { data } = await api.get("/teams/");
        setTeams(data);
      } catch (err) {
        setTeams([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTeams();
  }, []);

  return (
    <TeamContext.Provider value={{ teams, setTeams, loading }}>
      {children}
    </TeamContext.Provider>
  );
}
