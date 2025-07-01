import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Theme from './context/Theme'
import Language from './context/Language'
import ScreenSize from './context/ScreenSize'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme>
      <Language>
        <ScreenSize>
          <App />
        </ScreenSize>
      </Language>     
    </Theme>
  </StrictMode>
)
