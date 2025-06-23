import { useState } from 'react'
// contexts

// components
import {Page ,SignUpButton, SignInButton, PinkCircleButton, UsernameInput, PasswordInput} from "./components/ui";
import ToggleTheme from './components/other/ToggleTheme';
function App() {
  return (
    <Page>
      <UsernameInput/>
      <PasswordInput/>
      <SignInButton/>
      <SignUpButton/>
      <ToggleTheme/>
    </Page>
  );
}
export default App
