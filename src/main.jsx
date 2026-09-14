import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import User from './context/User'
import Theme from './context/Theme'
import Language from './context/Language'
import ScreenSize from './context/ScreenSize'
import PageLevel from './context/PageLevel'
import Error from './ErrorHandler'
import ErrorHandler from './ErrorHandler'
createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <ErrorHandler>
    <User>
      <Theme>
        <Language>
          <ScreenSize>
            <PageLevel>
              <App />
            </PageLevel>
          </ScreenSize>
        </Language>
      </Theme>
    </User>
  </ErrorHandler>
  // </StrictMode>
)
