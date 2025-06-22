import { useState } from 'react'
import {BlueRectButton, PinkRectButton, PinkCircleButton, UsernameInput, PasswordInput} from "./components/ui";
function App() {

  return (
    <>
    <UsernameInput/>
    <PasswordInput/>
    <PinkRectButton/>
    <BlueRectButton/>
    </>
  );
}
export default App
