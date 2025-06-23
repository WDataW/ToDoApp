import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Theme from './context/Theme'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme>   
      <App />
    </Theme>
  </StrictMode>
)
