import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import TrackContextProvider from "./context/TrackContext.tsx";
import { PlayerContextProvider } from "./context/PlayerContext.tsx";
import App from "./components/App/App.tsx";
import './index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <TrackContextProvider>
          <PlayerContextProvider>
              <BrowserRouter>
                  <App/>
              </BrowserRouter>
          </PlayerContextProvider>
      </TrackContextProvider>
  </StrictMode>,
)
