import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Theme from './context/Theme'
import Language from './context/Language'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme>
      <Language>
        <App />
      </Language>     
    </Theme>
  </StrictMode>
)
