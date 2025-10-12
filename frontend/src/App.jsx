import AppRoutes from "./routes/AppRoutes"
import { useUser } from "./context/userContext"
import { Navigate } from "react-router-dom";

function App() {
  const { user, loading } = useUser();
  
  if(loading) return <p>Loading...</p>
  if(!user) <Navigate to='/login' replace  />

  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App
