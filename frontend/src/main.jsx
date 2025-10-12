import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/userProvider.jsx'
import { EventProvider } from './context/eventProvider.jsx'
import { TeamProvider } from './context/teamProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <EventProvider>
        <TeamProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </TeamProvider>
      </EventProvider>
    </UserProvider>
  </StrictMode>,
)
